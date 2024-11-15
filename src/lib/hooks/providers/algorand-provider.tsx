"use client";

import { PeraWalletConnect } from "@perawallet/connect";
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
  localnet = 4160,
}

type AlgorandContextType = {
  accounts: string[];
  isConnected: boolean;
  network: AlgorandNetworks;
  connectAccount: () => void;
  activeAccount: string | null;
  disconnectAccount: () => void;
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
  network: AlgorandNetworks.testnet,
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
        network,
        accounts,
        setNetwork,
        isConnected,
        activeAccount,
        connectAccount,
        setActiveAccount,
        disconnectAccount,
      }}
    >
      {children}
    </AlgorandContext.Provider>
  );
}
