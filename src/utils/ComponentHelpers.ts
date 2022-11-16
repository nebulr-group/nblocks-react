const classNameFilter = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

// ISO 4217 => symbol
const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "GPB":
      return "£";
    case "EUR":
      return "€";
    case "JPY":
      return "¥";
    default:
      return currency;
  }
};

export { classNameFilter, getCurrencySymbol };
