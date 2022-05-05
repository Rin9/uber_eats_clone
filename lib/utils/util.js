export function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};
