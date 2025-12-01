import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import i18n from '@/i18n';

export const useLanguageStore = defineStore('language', () => {
  const STORAGE_KEY = 'vaLang';

  const lang = ref(localStorage.getItem(STORAGE_KEY) || 'fr');

  const languages = [
    {
      value: 'en',
      label: {
        fr: 'Anglais',
        en: 'English',
      },
      flag: 'gb',
    },
    {
      value: 'fr',
      label: {
        fr: 'Français',
        en: 'French',
      },
      flag: 'fr',
    },
  ];

  watch(
    lang,
    (newLang) => {
      i18n.global.locale.value = newLang;
      localStorage.setItem(STORAGE_KEY, newLang);
    },
    { immediate: true }
  );

  const currentLanguage = computed(() => {
    return languages.find((l) => l.value === lang.value);
  });

  return {
    lang,
    languages,
    currentLanguage,
  };
});
