"use client";

import { env } from "@/lib/utils";
import { PeraWalletConnect } from "@perawallet/connect";
import { SignerTransaction } from "@perawallet/connect/dist/util/model/peraWalletModels";
import algosdk from "algosdk";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import { useToast } from "../use-toast";

export enum AlgorandNetworks {
  mainnet = 416001,
  testnet = 416002,
  betanet = 416003,
}

type AlgorandContextType = {
  accounts: string[];
  isConnected: boolean;
  algod: algosdk.Algodv2;
  indexer: algosdk.Indexer;
  network: AlgorandNetworks;
  connectAccount: () => void;
  activeAccount: string | null;
  disconnectAccount: () => void;
  signTransaction: (
    txGroups: SignerTransaction[][],
    signerAddress?: string,
  ) => Promise<Uint8Array[]>;
  setActiveAccount: Dispatch<SetStateAction<string | null>>;
  setNetwork: Dispatch<SetStateAction<AlgorandNetworks>>;
};

export const AlgorandContext = createContext<AlgorandContextType>({
  accounts: [],
  isConnected: false,
  activeAccount: null,
  setNetwork: () => {},
  connectAccount: () => {},
  setActiveAccount: () => {},
  disconnectAccount: () => {},
  signTransaction: async () => [],
  network: AlgorandNetworks.testnet,
  algod: new algosdk.Algodv2("", "http://localhost:4001", ""),
  indexer: new algosdk.Indexer("", "http://localhost:8080", ""),
});

type Props = {
  children: React.ReactNode;
};

export default function AlgorandProvider({ children }: Props) {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [activeAccount, setActiveAccount] = useState<string | null>(null);
  const { toast } = useToast();

  const [network, setNetwork] = useState<AlgorandNetworks>(
    AlgorandNetworks.testnet,
  );

  const { algod, indexer } = useMemo(() => {
    switch (network) {
      case AlgorandNetworks.mainnet:
        return {
          algod: new algosdk.Algodv2(
            "",
            env.NEXT_PUBLIC_MAINNET_ALGOD_SERVER,
            "",
          ),
          indexer: new algosdk.Indexer(
            "",
            env.NEXT_PUBLIC_MAINNET_INDEXER_SERVER,
            "",
          ),
        };

      case AlgorandNetworks.testnet:
        return {
          algod: new algosdk.Algodv2(
            "",
            env.NEXT_PUBLIC_TESTNET_ALGOD_SERVER,
            "",
          ),
          indexer: new algosdk.Indexer(
            "",
            env.NEXT_PUBLIC_TESTNET_INDEXER_SERVER,
            "",
          ),
        };

      case AlgorandNetworks.betanet:
        return {
          algod: new algosdk.Algodv2(
            "",
            env.NEXT_PUBLIC_BETANET_ALGOD_SERVER,
            "",
          ),
          indexer: new algosdk.Indexer(
            "",
            env.NEXT_PUBLIC_BETANET_INDEXER_SERVER,
            "",
          ),
        };

      default:
        return {
          algod: new algosdk.Algodv2(
            "",
            env.NEXT_PUBLIC_TESTNET_ALGOD_SERVER,
            "",
          ),
          indexer: new algosdk.Indexer(
            "",
            env.NEXT_PUBLIC_TESTNET_INDEXER_SERVER,
            "",
          ),
        };
    }
  }, [network]);

  const peraWallet = useMemo(
    () =>
      new PeraWalletConnect({
        shouldShowSignTxnToast: true,
        chainId: network,
      }),
    [network],
  );

  const disconnectAccount = useCallback(() => {
    peraWallet.disconnect();

    setAccounts([]);
    setActiveAccount(null);
  }, [peraWallet]);

  const connectAccount = () => {
    peraWallet
      .connect()
      .then((accounts) => {
        peraWallet.connector?.on("disconnect", disconnectAccount);

        setAccounts(accounts);
        setActiveAccount(accounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          toast({
            title: "Error",
            description: "User denied connection",
            variant: "destructive",
          });
        }

        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  const signTransaction = useCallback(
    async (txGroups: SignerTransaction[][]) => {
      return peraWallet.signTransaction(txGroups);
    },
    [peraWallet],
  );

  useEffect(() => {
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector?.on("disconnect", disconnectAccount);

        if (peraWallet.isConnected && accounts.length) {
          setAccounts(accounts);
          setActiveAccount(accounts[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [disconnectAccount, peraWallet]);

  const isConnected = !!activeAccount;

  return (
    <AlgorandContext.Provider
      value={{
        algod,
        indexer,
        network,
        accounts,
        setNetwork,
        isConnected,
        activeAccount,
        connectAccount,
        setActiveAccount,
        disconnectAccount,
        signTransaction,
      }}
    >
      {children}
    </AlgorandContext.Provider>
  );
}
