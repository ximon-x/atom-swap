"use client";

import useAlgorand from "@/lib/hooks/use-algorand";
import { useToast } from "@/lib/hooks/use-toast";
import { sendAtomicSwapParams } from "@/lib/services/actions";
import { formatAddressToEllipsis, formatTransactionUrl } from "@/lib/utils";
import { DEVELOPER_ADDRESS, XAS_ASSET_PRICE } from "@/lib/utils/constants";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import algosdk from "algosdk";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Algo } from "../icons/algo";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { ToastAction } from "../ui/toast";

type Props = {
  sendAtomicSwap: (
    params: sendAtomicSwapParams,
  ) => Promise<number[][] | string>;
};

export default function SwapButton(props: Props) {
  const { sendAtomicSwap } = props;

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const { algod, activeAccount, signTransaction, network } = useAlgorand();

  const copyToClipboard = (text: string) => {
    setCopied(true);
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Address Copied",
        description: "The wallet address has been copied to your clipboard.",
      });
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = async () => {
    setLoading(true);

    try {
      if (!activeAccount) {
        return null;
      }

      const txns = await sendAtomicSwap({
        receiver: activeAccount,
      });

      if (typeof txns === "string") {
        toast({
          title: "Error",
          description: txns,
          variant: "destructive",
        });

        return;
      }

      const [optInTxnEnc, paymentTxnEnc, transferSignedTxn] = txns;

      const decodedOptIn = algosdk.decodeUnsignedTransaction(
        Uint8Array.from(optInTxnEnc),
      );

      const decodedPayment = algosdk.decodeUnsignedTransaction(
        Uint8Array.from(paymentTxnEnc),
      );

      const decodedTransfer = algosdk.decodeSignedTransaction(
        Uint8Array.from(transferSignedTxn),
      );

      const signedClientTxns: Uint8Array[] = await signTransaction([
        [
          {
            txn: decodedOptIn,
            signers: [algosdk.encodeAddress(decodedOptIn.from.publicKey)],
          },
          {
            txn: decodedPayment,
            signers: [algosdk.encodeAddress(decodedPayment.from.publicKey)],
          },
          {
            txn: decodedTransfer.txn,
            signers: [],
          },
        ],
      ]);

      // const optInSignedTxnNArr: number[] = Array.from(signedClientTxns[0]);
      // const paymentSignedTxnNArr: number[] = Array.from(signedClientTxns[1]);
      // const transferSignedTxnNArr: number[] = transferSignedTxn;

      // const txnDataSigned = [
      //   optInSignedTxnNArr,
      //   paymentSignedTxnNArr,
      //   transferSignedTxnNArr,
      // ];

      // ! THIS CAUSES THE TRANSACTION TO FAIL WITH "Incomplete Group". THERE ARE
      // ! ENOUGH AVAILABLE RESOURCES FROM PERA CONNECT DOCS THAT SHOWS THE PROPER
      // ! WAY TO DO THIS, ASIDE THIS: https://github.com/perawallet/connect/issues/10.
      // TODO: Find the correct way to do this.
      const { txId } = await algod.sendRawTransaction(signedClientTxns).do();

      toast({
        title: "Donation successful",
        description: "Thank you for your donation!",
        action: (
          <ToastAction
            altText="View Tx"
            onClick={() => router.push(formatTransactionUrl(txId, network))}
          >
            View Transaction
          </ToastAction>
        ),
        variant: "default",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Something went wrong",
          description: error.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Transaction failed",
        description:
          "Something went wrong with the transaction. Please try again.",
        variant: "destructive",
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          Swap Asset
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ximon Atom ASA</DialogTitle>
          <DialogDescription>
            Complete your purchase of this unique ASA. Please review the details
            before confirming.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <Image
              src="/icon.svg"
              alt="Ximon Atom ASA"
              width={256}
              height={256}
              className="h-64 w-64 rounded-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="creator" className="text-right">
              Creator:
            </Label>
            <div className="col-span-3">
              <span className="mr-2 cursor-pointer truncate font-mono text-sm">
                {formatAddressToEllipsis(DEVELOPER_ADDRESS, 14)}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(DEVELOPER_ADDRESS)}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price:
            </Label>
            <div className="col-span-3 flex items-center font-bold">
              <Algo className="h-12 w-12" />
              {AlgoAmount.MicroAlgos(XAS_ASSET_PRICE).algos}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSwap} disabled={loading}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
