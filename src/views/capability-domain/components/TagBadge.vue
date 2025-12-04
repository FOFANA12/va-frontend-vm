<template>
  <span
    :class="[
      'inline-flex items-center px-2 py-1.5 rounded-full text-xs bg-gray-100 text-gray-700',
      customClass
    ]"
  >
    <slot>{{ label }}</slot>
    <button
      v-if="removable"
      type="button"
      class="ml-1 hover:text-red-600 focus:outline-none"
      @click="$emit('remove')"
    >
      <X class="w-4 h-4" />
    </button>
  </span>
</template>

<script setup>
import { X } from 'lucide-vue-next';

defineProps({
  label: String,
  removable: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: [String, Array, Object],
    default: '',
  },
});
</script>
