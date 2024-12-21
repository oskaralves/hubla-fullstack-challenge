export const currencyFormatter = (
  value: number | string,
  locales: Intl.LocalesArgument = "pt-BR",
  currency: string = "BRL"
) => {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
  }).format(Number(value) / 100);

  return `${amount}`;
};
