<template>
  <div class="flex flex-col">
    <label v-if="label" :for="id" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400 pt-1">
      {{ label }}
    </label>

    <NRate
      v-model:value="innerValue"
      :count="numberOfStars"
      :size="starSize"
      :color="activeColor"
      :allow-half="allowHalf"
      :readonly="readOnly"
      class="text-primary-500"
    />

    <span v-if="error" class="text-xs text-red-500 mt-1">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
import { NRate } from 'naive-ui';

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  id: { type: String, default: null },
  label: { type: String, default: null },
  error: { type: String, default: null },
  numberOfStars: { type: Number, default: 5 },
  starSize: { type: [Number, String], default: 'large' },
  activeColor: { type: String, default: 'var(--color-primary-500)' },
  readOnly: { type: Boolean, default: false },
  allowHalf: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
