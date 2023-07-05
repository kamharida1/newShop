export function formatCurrency(amount: {amount: number}) {
  const currencySymbol = "\u20A6";

  // Remove any existing commas from the amount
  const formattedAmount = amount.toString().replace(/,/g, "");

  // Add commas every three digits from the right
  const parts = formattedAmount.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Rejoin the parts and add the currency symbol
  const formattedCurrency = currencySymbol + parts.join(".");

  return formattedCurrency;
}
