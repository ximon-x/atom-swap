"use server";

import { AlgorandNetworks } from "@/lib/hooks/providers/algorand-provider";
import "server-only";

import { apiRequest } from ".";

type GetVerifiedAssetIdssParams = {
  network: AlgorandNetworks;
};

type GetVerifiedAssetIdssResponse = {
  results: {
    asset_id: number;
    verification_tier: "trusted" | "verified" | "unverified" | "suspicious";
  };
}[];

export const getVerifiedAssetIds = (params: GetVerifiedAssetIdssParams) => {
  return apiRequest<GetVerifiedAssetIdssParams, GetVerifiedAssetIdssResponse>({
    url: `/verified-assets`,
    method: "GET",
    params,
  });
};

export type PeraAsset = {
  asset_id: number;
  name: string;
  unit_name: string;
  fraction_decimals: number;
  total_supply: number;
  is_deleted: boolean;
  creator_address: string;
  url: string;
  logo: string;
  verification_tier: "trusted" | "verified" | "unverified" | "suspicious";
  usd_value: string;
  is_collectible: boolean;
};

export type GetVerifiedAssets = {
  network: AlgorandNetworks;
};

export type GetVerifiedAssetsResponse = {
  previous: string | null;
  next: string | null;

  results: PeraAsset[];
};

export const getVerifiedAssets = () => {
  return apiRequest<GetVerifiedAssets, GetVerifiedAssetsResponse>({
    url: `/assets?filter=is_verified`,
    method: "GET",
  });
};
