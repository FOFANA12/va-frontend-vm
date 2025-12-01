<template>
  <div class="w-full mx-auto bg-white rounded-lg my-4">
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4">
        <!-- File type filter -->
        <div class="col-span-12 md:col-span-4">
          <SingleSelect
            id="file_type"
            name="file_type"
            v-model="filters.filterFileType"
            :options="store.fileTypes"
            :label="t('attachment.filter.fileType')"
            :placeholder="t('attachment.filter.fileTypePlaceholder')"
            value-key="id"
            label-key="name"
            filterable
            clearable
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAttachmentStore } from '@/store';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue', 'filter']);

const { t } = useI18n();
const store = useAttachmentStore();

const defaultFilters = {
  filterFileType: '',
};

const filters = ref({
  ...defaultFilters,
  ...props.modelValue,
});

/**
 * Sync filters to parent + update store.serverParams
 */
watch(
  filters,
  (val) => {
    store.setFilters(val);
    emit('update:modelValue', val);
    emit('filter', val);
  },
  { deep: true }
);
</script>
