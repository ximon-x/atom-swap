import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_MAINNET_ALGOD_SERVER: z
      .string()
      .min(1, { message: "Mainnet Algod server is required" })
      .url({ message: "Mainnet Algod server must be a valid URL" }),

    NEXT_PUBLIC_MAINNET_INDEXER_SERVER: z
      .string()
      .min(1, { message: "Mainnet Indexer server is required" })
      .url({ message: "Mainnet Indexer server must be a valid URL" }),

    NEXT_PUBLIC_TESTNET_ALGOD_SERVER: z
      .string()
      .min(1, { message: "Testnet Algod server is required" })
      .url({ message: "Testnet Algod server must be a valid URL" }),

    NEXT_PUBLIC_TESTNET_INDEXER_SERVER: z
      .string()
      .min(1, { message: "Testnet Indexer server is required" })
      .url({ message: "Testnet Indexer server must be a valid URL" }),

    NEXT_PUBLIC_BETANET_ALGOD_SERVER: z
      .string()
      .min(1, { message: "Betanet Algod server is required" })
      .url({ message: "Betanet Algod server must be a valid URL" }),

    NEXT_PUBLIC_BETANET_INDEXER_SERVER: z
      .string()
      .min(1, { message: "Betanet Indexer server is required" })
      .url({ message: "Betanet Indexer server must be a valid URL" }),
  },
  server: {},

  runtimeEnv: {
    NEXT_PUBLIC_MAINNET_ALGOD_SERVER:
      process.env.NEXT_PUBLIC_MAINNET_ALGOD_SERVER,
    NEXT_PUBLIC_MAINNET_INDEXER_SERVER:
      process.env.NEXT_PUBLIC_MAINNET_INDEXER_SERVER,

    NEXT_PUBLIC_TESTNET_ALGOD_SERVER:
      process.env.NEXT_PUBLIC_TESTNET_ALGOD_SERVER,
    NEXT_PUBLIC_TESTNET_INDEXER_SERVER:
      process.env.NEXT_PUBLIC_TESTNET_INDEXER_SERVER,

    NEXT_PUBLIC_BETANET_ALGOD_SERVER:
      process.env.NEXT_PUBLIC_BETANET_ALGOD_SERVER,
    NEXT_PUBLIC_BETANET_INDEXER_SERVER:
      process.env.NEXT_PUBLIC_BETANET_INDEXER_SERVER,
  },
});
