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

const format = {
  shortenID,
  formatToNearGas,
  formatAddressToEllipsis,
  formatInitialCapitalize,
};

export default format;
