"use server";

import { getVerifiedAssets, PeraAsset } from "@/api/assets";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import algosdk from "algosdk";

import { AlgorandNetworks } from "../hooks/providers/algorand-provider";
import { env } from "../utils";
import { XAS_ASSET_ID } from "../utils/constants";

type fetchAssetsParams = {
  network: AlgorandNetworks;
};

export async function fetchAssets({}: fetchAssetsParams): Promise<
  PeraAsset[] | string
> {
  const res = await getVerifiedAssets();

  if (res instanceof Error) {
    return res.message;
  }

  return res.results;
}

export type sendAtomicSwapParams = {
  receiver: string;
};
export async function sendAtomicSwap({
  receiver,
}: sendAtomicSwapParams): Promise<number[][] | string> {
  try {
    const algod = new algosdk.Algodv2(
      "",
      env.NEXT_PUBLIC_TESTNET_ALGOD_SERVER,
      "",
    );

    const developerAccount = algosdk.mnemonicToSecretKey(
      env.DEVELOPER_MNEMONIC,
    );

    const suggestedParams = await algod.getTransactionParams().do();

    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: receiver,
      to: receiver,
      assetIndex: XAS_ASSET_ID,
      suggestedParams,
      amount: 0,
    });

    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: receiver,
      to: developerAccount.addr,
      amount: AlgoAmount.Algos(1).microAlgos,
      suggestedParams,
    });

    const transferTxn =
      algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: developerAccount.addr,
        to: receiver,
        assetIndex: XAS_ASSET_ID,
        amount: 10,
        suggestedParams,
      });

    const txns = [optInTxn, paymentTxn, transferTxn];
    const txgroup = algosdk.assignGroupID(txns);

    const optInTxnEnc = Array.from(
      algosdk.encodeUnsignedTransaction(txgroup[0]),
    );
    const paymentTxnEnc = Array.from(
      algosdk.encodeUnsignedTransaction(txgroup[1]),
    );

    const transferSignedTxn = Array.from(
      txgroup[2].signTxn(developerAccount.sk),
    );

    return [optInTxnEnc, paymentTxnEnc, transferSignedTxn];
  } catch (error) {
    console.error(`Error sending atomic swap transaction`, error);
    return "Something went wrong";
  }
}
