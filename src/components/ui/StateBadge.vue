<script setup>
const props = defineProps({
  state: {
    type: Object,
    default: () => ({ code: 'none', label: '-', color: '#6b7280' }),
  },
  label: {
    type: String,
    default: 'État',
  },
});
</script>

<template>
  <div
    class="px-4 py-3 rounded-lg text-sm font-semibold text-white"
    :style="{ backgroundColor: state?.color || '#6b7280' }"
  >
    {{ label }} :
    <span class="ml-1">{{ state?.label || '-' }}</span>
  </div>
</template>
