// Remove non-numeric characters and ensure valid numeric input
// Restrict to two decimal places
export const sanitizedCurrencyInput = (input: string) =>
  input.replace(/[^0-9.]/g, "").replace(/^(\d+(\.\d{0,2})?).*$/, "$1");
