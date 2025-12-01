import { useI18n } from 'vue-i18n';
import moment from 'moment';


export function useDateTimeFormatter() {
  const { locale } = useI18n();

  const formatDate = (date, format = 'DD/MM/YYYY') => {
    try {
      const m = moment(date);
      if (!m.isValid()) return null;
      return m.locale(locale.value).format(format);
    } catch {
      return null;
    }
  };

  const formatDatetime = (datetime, format = 'DD/MM/YYYY [à] HH:mm') => {
    try {
      const m = moment(datetime);
      if (!m.isValid()) return null;
      return m.locale(locale.value).format(format);
    } catch {
      return null;
    }
  };

  const parse = (value, inputFormat) => {
    const m = inputFormat ? moment(value, inputFormat, true) : moment(value);
    return m.isValid() ? m.locale(locale.value) : null;
  };

  return {
    formatDate,
    formatDatetime,
    parse,
  };
}
