import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useThousandSeparator() {
  const { locale } = useI18n();

  const formatNumber = computed(() => {
    return (value, options = {}) => {
      if (value === null || value === undefined || isNaN(value)) return '';

      const formatter = new Intl.NumberFormat(locale.value, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true,
        ...options, // allow override if needed
      });

      return formatter.format(value);
    };
  });

  return { formatNumber };
}
