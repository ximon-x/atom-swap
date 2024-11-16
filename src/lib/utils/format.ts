import { AlgorandNetworks } from "../hooks/providers/algorand-provider";

export function formatToNearGas({ gas }: { gas: number }): string {
  return (gas * 1e12).toFixed(0);
}

export function formatAddressToEllipsis(address = ``, width = 6): string {
  return address
    ? `${address.slice(0, width)}...${address.slice(-width)}`
    : address;
}

export function formatInitialCapitalize(str = ``): string {
  return str ? `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}` : str;
}

export function shortenID(id: string) {
  const idLength = id.length;
  return `${id.slice(0, 3)}...${id.slice(idLength - 3, idLength)}`;
}

export function formatTransactionUrl(txId: string, network: AlgorandNetworks) {
  switch (network) {
    case AlgorandNetworks.mainnet:
      return `https://lora.algokit.io/mainnet/transaction/${txId}`;

    case AlgorandNetworks.testnet:
      return `https://lora.algokit.io/testnet/transaction/${txId}`;

    case AlgorandNetworks.betanet:
      return `https://lora.algokit.io/betanet/transaction/${txId}`;

    default:
      return `https://lora.algokit.io/mainnet/transaction/${txId}`;
  }
}

const format = {
  shortenID,
  formatToNearGas,
  formatAddressToEllipsis,
  formatInitialCapitalize,
  formatTransactionUrl,
};

export default format;
