export function formatRentPrice(rentPrice: string | number) {
  if (!rentPrice) return "NA";

  const value = String(rentPrice).trim();

  // If NA or Negotiable → return as-is
  if (value.toLowerCase() === "na" || value.toLowerCase() === "negotiable") {
    return value; // return directly
  }

  // If the price contains a range like "1850-4000"
  if (value.includes("-")) {
    const [min, max] = value
      .split("-")
      .map((v) => parseInt(v.replace(/\D/g, ""), 10));
    if (!isNaN(min) && !isNaN(max)) {
      return `₹ ${min.toLocaleString("en-IN")} - ₹ ${max.toLocaleString(
        "en-IN"
      )}`;
    }
  }

  // Remove any non-digit characters (₹, /-, spaces, etc.)
  const numeric = parseInt(value.replace(/\D/g, ""), 10);

  if (isNaN(numeric)) {
    return value; // fallback if cannot parse
  }

  return `₹ ${numeric.toLocaleString("en-IN")}`;
}
