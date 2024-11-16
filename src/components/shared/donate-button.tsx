"use client";

import useAlgorand from "@/lib/hooks/use-algorand";
import { useToast } from "@/lib/hooks/use-toast";
import { formatTransactionUrl } from "@/lib/utils";
import { DEVELOPER_ADDRESS } from "@/lib/utils/constants";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import algosdk from "algosdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoadingSpinner } from "../icons/loading-spinner";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";

export default function DonateButton() {
  const [loading, setLoading] = useState(false);
  const { isConnected, algod, activeAccount, signTransaction, network } =
    useAlgorand();
  const router = useRouter();

  const { toast } = useToast();

  const handleDonation = async () => {
    setLoading(true);

    try {
      if (!activeAccount) {
        return null;
      }

      const suggestedParams = await algod.getTransactionParams().do();

      const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAccount,
        to: DEVELOPER_ADDRESS,
        amount: AlgoAmount.Algos(1).microAlgos,
        suggestedParams,
      });

      const txGroup = [{ txn: paymentTxn, signers: [activeAccount] }];
      const signedTxnGroup = await signTransaction([txGroup]);

      const { txId } = await algod.sendRawTransaction(signedTxnGroup).do();

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
          "Please verify you have sufficient funds and try again later",
        variant: "destructive",
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={!isConnected || loading}
      size="lg"
      onClick={handleDonation}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <LoadingSpinner className="h-4 w-4" /> Donating...
        </span>
      ) : (
        <span>Donate 1 ALGO</span>
      )}
    </Button>
  );
}
