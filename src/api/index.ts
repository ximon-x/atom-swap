"use server";

import { env } from "@/lib/utils";
import "server-only";

interface RequestConfig<T> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  params?: T;
  headers?: never;
}

export async function apiRequest<D = unknown, R = unknown, E = Error>({
  url,
  method,
  params,
}: RequestConfig<D>) {
  const body = JSON.stringify(params);
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };

  const init: RequestInit = {
    method,
    headers,
    body: method === "GET" ? undefined : body,
  };

  // const baseUrl =
  //   network === AlgorandNetworks.mainnet
  //     ? env.NEXT_PUBLIC_PERA_MAINNET_PUBLIC_API
  //     : network === AlgorandNetworks.testnet
  //       ? env.NEXT_PUBLIC_PERA_TESTNET_PUBLIC_API
  //       : env.NEXT_PUBLIC_PERA_BETANET_PUBLIC_API;

  // if (!baseUrl) {
  //   return new Error("Pera Public API is not configured for this network") as E;
  // }

  const baseUrl = env.NEXT_PUBLIC_MAINNET_PERA_API;

  const response = await fetch(`${baseUrl}${url}`, init);

  if (!response.ok) {
    return new Error(response.statusText) as E;
  }

  const data = (await response.json()) as R;
  return data;
}
