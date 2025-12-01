import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useCurrencyFormatter() {
  const { locale } = useI18n();

  const formatCurrency = computed(() => {
    return (amount, currencyCode = null) => {
      if (amount === null || amount === undefined) return "";

      // Fallback to "MRU" if no currency code is provided
      if (!currencyCode) {
        const localeCurrency = new Intl.Locale(locale.value).maximize()
          .currency;
        currencyCode = localeCurrency || "MRU";
      }
      const symbol = currencyCode.slice(0, 3).toUpperCase();

      // Format the currency with proper separators based on locale
      const formatter = new Intl.NumberFormat(locale.value, {
        style: "currency",
        currency: symbol,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      });

      return formatter.format(amount);
    };
  });

  return { formatCurrency };
}
