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
            :label="t('action.filter.status')"
            :placeholder="t('action.filter.statusPlaceholder')"
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
            :label="t('action.filter.state')"
            :placeholder="t('action.filter.statePlaceholder')"
            value-key="code"
            label-key="name"
            filterable
            clearable
          />
        </div>

        <!-- Nature filter -->
        <div class="col-span-12 md:col-span-4">
          <SingleSelect
            id="nature"
            name="nature"
            v-model="filters.nature"
            :options="natures"
            :label="t('action.filter.nature')"
            :placeholder="t('action.filter.naturePlaceholder')"
            value-key="code"
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
import { useActionStore } from '@/store';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue', 'filter']);

const { t } = useI18n();
const store = useActionStore();

const defaultFilters = {
  status: '',
  state: '',
  nature: '',
};

const natures = ref([
  { code: 'failed', name: t('action.filter.failed') },
  { code: 'alert', name: t('action.filter.alert') },
]);

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
