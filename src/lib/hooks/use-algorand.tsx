"use client";

import { useContext } from "react";

import { AlgorandContext } from "./providers/algorand-provider";

export default function useAlgorand() {
  return { ...useContext(AlgorandContext) };
}
