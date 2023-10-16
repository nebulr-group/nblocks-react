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

/** 'day' | 'month' | 'week' | 'year' */
const getRecurIntervalSymbol = (recurInterval: string) => {
  switch (recurInterval) {
    case "day":
      return "d";
    case "month":
      return "mo";
    case "week":
      return "wk";
    case "year":
      return "yr";
  }
};



export { classNameFilter, getCurrencySymbol, getRecurIntervalSymbol };
