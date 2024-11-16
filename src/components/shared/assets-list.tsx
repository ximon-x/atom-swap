"use client";

import { PeraAsset } from "@/api/assets";
import { AlgorandNetworks } from "@/lib/hooks/providers/algorand-provider";
import useAlgorand from "@/lib/hooks/use-algorand";
import { useToast } from "@/lib/hooks/use-toast";
import { formatTransactionUrl } from "@/lib/utils";
import algosdk from "algosdk";
import { CheckCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ToastAction } from "../ui/toast";

type Props = {
  fetchAssets: ({
    network,
  }: {
    network: AlgorandNetworks;
  }) => Promise<PeraAsset[] | string>;
};
export default function AssetsList(props: Props) {
  const { fetchAssets } = props;

  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<PeraAsset[]>([]);
  const {
    network,
    indexer,
    algod,
    isConnected,
    activeAccount,
    signTransaction,
  } = useAlgorand();

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const res = await fetchAssets({ network });

      if (typeof res === "string") {
        toast({
          title: "Error",
          description: res,
          variant: "destructive",
        });

        return;
      }

      setAssets(res);
    })();
  }, [fetchAssets, network, toast]);

  const handleOptIn = async ({ assetId }: { assetId: number }) => {
    setLoading(true);

    try {
      if (!activeAccount) {
        throw new Error("No active account");
      }

      const { assets } = await indexer.lookupAccountAssets(activeAccount).do();
      const optedIn = assets.some(
        (asset: { "asset-id": number }) => asset["asset-id"] === assetId,
      );

      if (optedIn) {
        throw new Error("Asset already opted in");
      }

      const suggestedParams = await algod.getTransactionParams().do();

      const optInTxn =
        algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: activeAccount,
          to: activeAccount,
          assetIndex: assetId,
          suggestedParams,
          amount: 0,
        });

      const txGroup = [{ txn: optInTxn, signers: [activeAccount] }];
      const signedTxnGroup = await signTransaction([txGroup]);

      const { txId } = await algod.sendRawTransaction(signedTxnGroup).do();

      toast({
        title: "Opted In",
        description: "Asset successfully opted in",
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
          title: "Error",
          description: error.message,
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollArea className="h-96 w-full rounded-md border">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Verified Assets</h1>
        </div>

        <div className="space-y-4">
          {assets.map((asset) => (
            <li
              key={asset.asset_id}
              className="flex items-center space-x-4 border-t pt-4 last:border-b-0"
            >
              <Avatar>
                <AvatarImage src={asset.logo} />
                <AvatarFallback>ASA</AvatarFallback>
              </Avatar>

              <div className="flex-grow">
                <h2 className="text-md flex items-center justify-start gap-2 font-semibold">
                  {asset.unit_name}
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </h2>
                <p className="text-sm text-muted-foreground">
                  {asset.name} #{asset.asset_id}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => handleOptIn({ assetId: asset.asset_id })}
                disabled={!isConnected || loading}
              >
                Opt In <PlusCircle className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
