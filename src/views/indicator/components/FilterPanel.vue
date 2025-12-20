<template>
  <div class="w-full mx-auto bg-white rounded-lg my-4">
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4">
        <!-- Status filter -->
        <div class="col-span-12 md:col-span-4">
          <SingleSelect
            id="status"
            name="status"
            v-model="filters.status"
            :options="store.filterStatuses"
            :label="t('indicator.filter.status')"
            :placeholder="t('indicator.filter.statusPlaceholder')"
            value-key="code"
            label-key="name"
            filterable
            clearable
          />
        </div>

        <!-- State filter -->
        <div class="col-span-12 md:col-span-4">
          <SingleSelect
            id="state"
            name="state"
            v-model="filters.state"
            :options="store.filterStates"
            :label="t('indicator.filter.state')"
            :placeholder="t('indicator.filter.statePlaceholder')"
            value-key="code"
            label-key="name"
            filterable
            clearable
          />
        </div>

        <!-- Category filter -->
        <div class="col-span-12 md:col-span-4">
          <SingleSelect
            id="category"
            name="category"
            v-model="filters.category"
            :options="store.filterCategories"
            :label="t('indicator.filter.category')"
            :placeholder="t('indicator.filter.categoryPlaceholder')"
            value-key="uuid"
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
import { useIndicatorStore } from '@/store';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue', 'filter']);

const { t } = useI18n();
const store = useIndicatorStore();

const defaultFilters = {
  status: '',
  state: '',
  category: '',
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
