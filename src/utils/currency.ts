type CurrencyInput =
  | { kind: "code"; value: string }
  | { kind: "symbol"; value: string }
  | { kind: "none" };

function parseCurrency(input?: string): CurrencyInput {
  if (!input) return { kind: "none" };

  const upper = input.toUpperCase();

  if (
    /^[A-Z]{3}$/.test(upper) &&
    Intl.supportedValuesOf("currency").includes(upper)
  ) {
    return { kind: "code", value: upper };
  }

  return { kind: "symbol", value: input };
}

export function formatCurrency(
  amount: number,
  currency?: string,
  locale = "tr-TR"
) {
  const parsed = parseCurrency(currency);

  // 1️⃣ Currency yok → plain number
  if (parsed.kind === "none") {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: "compact",
    }).format(amount);
  }

  // 2️⃣ Code varsa → native & doğru
  if (parsed.kind === "code") {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: parsed.value,
        notation: "compact",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      console.error("currency error");
    }
  }

  // 3️⃣ Symbol fallback (presentation-only)
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD", // sadece layout almak için
    minimumFractionDigits: 2,
    notation: "compact",

    maximumFractionDigits: 2,
  }).formatToParts(amount);

  return parts
    .map((p) => (p.type === "currency" ? parsed.value : p.value))
    .join("");
}

export const getCurrencySymbol = (currency?: string, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  })
    .format(1000)
    .split(" ")[0];
};
