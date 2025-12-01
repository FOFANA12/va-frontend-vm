<template>
  <div class="col-span-12 md:col-span-6 lg:col-span-4">
    <label :for="id" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :id="id"
        :value="status?.[displayKey] || ''"
        type="text"
        class="pl-7 w-full py-2.5 px-3 rounded-lg border text-sm bg-gray-50 text-gray-800 cursor-not-allowed border-gray-300"
        :placeholder="placeholder || label"
        :aria-label="label"
        disabled
        readonly
      />
      <Circle
        class="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4"
        :style="{ color: status?.color || '#d1d5db' }"
      />
      <button
        v-if="editable"
        type="button"
        @click="onEdit"
        class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-primary-600"
      >
        <SquarePen class="w-5 h-5 text-primary-600" />
      </button>
    </div>
  </div>
</template>
  
  <script setup>
import { Circle, SquarePen } from 'lucide-vue-next';

defineProps({
  id: {
    type: String,
    default: 'status',
  },
  label: {
    type: String,
    default: 'Statut',
  },
  placeholder: {
    type: String,
    default: '',
  },
  status: {
    type: Object,
    required: true,
  },
  displayKey: {
    type: String,
    default: 'label',
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['edit']);

const onEdit = () => {
  emit('edit');
};
</script>
  