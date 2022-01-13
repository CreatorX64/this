export default function calcTax(price) {
  return Number(price) * 1.2;
}

export function calcTaxandSum(...prices) {
  return prices.reduce((total, p) => (total += calcTax(p)), 0);
}
