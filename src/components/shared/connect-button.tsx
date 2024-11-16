"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlgorandNetworks } from "@/lib/hooks/providers/algorand-provider";
import useAlgorand from "@/lib/hooks/use-algorand";
import { useToast } from "@/lib/hooks/use-toast";
import { formatAddressToEllipsis } from "@/lib/utils";
import { Check, Copy, Globe, LogIn, User2, UserCheck2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";

export default function ConnectButton() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const {
    network,
    accounts,
    setNetwork,
    isConnected,
    activeAccount,
    connectAccount,
    setActiveAccount,
    disconnectAccount,
  } = useAlgorand();

  if (!isConnected || !activeAccount) {
    return (
      <Button onClick={connectAccount}>
        Connect with Pera <LogIn className="h-4 w-4" />
      </Button>
    );
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      toast({
        title: "Address Copied",
        description: "The wallet address has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          Connected: {formatAddressToEllipsis(activeAccount, 3)}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Manage Wallet</DialogTitle>
        <DialogDescription>
          You can switch or disconnect your account here, and also switch
          networks.
        </DialogDescription>

        <ul className="space-y-2">
          {accounts.map((account, index) => {
            return (
              <li
                key={account}
                className="flex items-center justify-between rounded-lg bg-secondary p-2 transition-all duration-300 ease-in-out hover:shadow-md"
              >
                {account == activeAccount ? (
                  <UserCheck2 className="h-4 w-4 text-green-500" />
                ) : (
                  <User2
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => setActiveAccount(account)}
                  />
                )}

                <span
                  className="mr-2 cursor-pointer truncate font-mono text-sm"
                  onClick={() => setActiveAccount(account)}
                >
                  {formatAddressToEllipsis(account, 18)}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(account, index)}
                  className="shrink-0"
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy address</span>
                </Button>
              </li>
            );
          })}
        </ul>

        <Button onClick={disconnectAccount} variant="destructive">
          Disconnect
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button type="button" variant="outline">
              <Globe className="h-4 w-4" />
              {network === AlgorandNetworks.mainnet
                ? "Mainnet"
                : network === AlgorandNetworks.testnet
                  ? "Testnet"
                  : network === AlgorandNetworks.betanet
                    ? "Betanet"
                    : "Localnet"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setNetwork(AlgorandNetworks.mainnet)}
              disabled={network === AlgorandNetworks.mainnet}
            >
              Mainnet
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setNetwork(AlgorandNetworks.testnet)}
              disabled={network === AlgorandNetworks.testnet}
            >
              Testnet
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setNetwork(AlgorandNetworks.betanet)}
              disabled={network === AlgorandNetworks.betanet}
            >
              Betanet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DialogContent>
    </Dialog>
  );
}
