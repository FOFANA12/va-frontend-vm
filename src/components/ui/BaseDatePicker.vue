<template>
  <div>
    <!-- Label -->
    <label :for="id" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>

    <!-- Date Picker Wrapper -->
    <div class="relative">
      <VueDatePicker
        v-model="internalValue"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :locale="currentLocale"
        :formats="{ input: currentFormat }"
        :time-config="{ enableTimePicker: enableTime }"
        :auto-apply="true"
        :clearable="true"
        :class="['w-full']"
      />
    </div>

    <!-- Error message -->
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>

    <!-- Optional hint text -->
    <p v-if="$slots.hint" class="text-gray-500 text-xs mt-1">
      <slot name="hint" />
    </p>
  </div>
</template>

<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { fr, enUS } from 'date-fns/locale';
const { locale } = useI18n();

const localeMap = {
  fr: fr,
  en: enUS,
};

const formatMap = {
  fr: 'dd/MM/yyyy',
  en: 'MM/dd/yyyy',
};

const currentLocale = computed(() => localeMap[locale.value] || fr);
const currentFormat = computed(() => formatMap[locale.value] || 'yyyy-MM-dd');

// Props definition
const props = defineProps({
  modelValue: [String, Date],
  name: String,
  id: String,
  label: String,
  placeholder: String,
  error: String,
  required: Boolean,
  enableTime: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

// Internal value
const internalValue = ref(props.modelValue ?? null);

// Sync parent → internal
watch(
  () => props.modelValue,
  (val) => (internalValue.value = val)
);

watch(internalValue, (val) => {
  if (val === null || val === undefined) {
    emit('update:modelValue', null);
    return;
  }

  if (val instanceof Date) {
    const y = val.getFullYear();
    const m = String(val.getMonth() + 1).padStart(2, '0');
    const d = String(val.getDate()).padStart(2, '0');
    emit('update:modelValue', `${y}-${m}-${d}`);
  } else {
    emit('update:modelValue', val);
  }
});
</script>

<style scoped>
:deep(.dp__input_wrap) {
  width: 100%;
  position: relative !important;

  /* TRICK pour forcer l’icône calendrier à droite */
  direction: rtl !important;
}

/* Date sélectionnée - fond et texte */
:deep(.dp__active_date) {
  background-color: var(--color-primary-500) !important; /* bg-blue-500 */
  color: white !important;
}

/* Date aujourd'hui (today) - optionnel */
:deep(.dp__today) {
  border: 1px solid var(--color-primary-500) !important;
}

:deep(.dp__input) {
  direction: ltr !important; /* permet que le texte reste normal */
  width: 100% !important;
  padding-right: 3.5rem !important; /* espace pour les icônes */
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0.5rem !important;
  font-size: 0.875rem !important;
  background-color: white !important;
  color: #1f2937 !important;
}
</style>

