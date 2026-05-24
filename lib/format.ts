/** AUD currency, no decimals. Used by the ROI calculator. */
export const aud = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

/** Plain integer with thousands separators. */
export const int = (n: number) =>
  new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(
    Math.round(n),
  );

/** Percentage from a 0-100 number. */
export const pct = (n: number) => `${Math.round(n)}%`;
