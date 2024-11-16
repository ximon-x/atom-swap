"use server";

import { getVerifiedAssets, PeraAsset } from "@/api/assets";

import { AlgorandNetworks } from "../hooks/providers/algorand-provider";

type params = {
  network: AlgorandNetworks;
};

export async function fetchAssets({}: params): Promise<PeraAsset[] | string> {
  const res = await getVerifiedAssets();

  if (res instanceof Error) {
    return res.message;
  }

  return res.results;
}
