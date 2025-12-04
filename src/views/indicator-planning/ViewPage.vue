<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <div class="flex justify-end mt-4 gap-4">
      <LinkButton
        :to="backRoute"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('indicator.btnList') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.IND_MANAGE_PLANNING)"
        :to="editRoute"
        variant="primary"
        class="min-w-[100px]"
      >
        <Edit class="w-5 h-5 mr-2" />
        {{ isPlanned ? t('common.edit') : t('indicatorPlanning.btnCreatePlanning') }}
      </LinkButton>
    </div>

    <div class="mt-6">
      <Form :isPlanned="isPlanned" />
    </div>

    <!-- Chart -->
    <div class="mt-6">
      <PerformanceLineChart
        v-if="chartLabels.length"
        :labels="chartLabels"
        :datasets="chartDatasets"
        :unit="form.unit"
        :height="400"
      />
    </div>
  </PageStateWrapper>
</template>

<script setup>
import { Edit, Plus } from 'lucide-vue-next';
import Form from './components/form/View.vue';
import { useDateTimeFormatter } from '@/composables/useDateTimeFormatter';

import { useIndicatorPlanningStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import PerformanceLineChart from '@/components/ui/charts/PerformanceLineChart.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const { formatDate } = useDateTimeFormatter();

const { t } = useI18n();
const route = useRoute();
const store = useIndicatorPlanningStore();
store.resetForm();
const form = store.form;

const isPlanned = computed(() => !!form.is_planned);

const backRoute = computed(() => {
  return { name: 'indicator' };
});

const editRoute = computed(() => {
  return {
    name: route.name.replace(/-show$/, '-edit'),
    params: { id: route.params.id },
  };
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.find(route.params.id, 'view'));

const chartLabels = computed(() => {
  return (form.periods || []).map(
    (p, idx) => `P${idx + 1} (${formatDate(p.start_date)} - ${formatDate(p.end_date)})`
  );
});

const chartDatasets = computed(() => {
  if (!form.periods) return [];

  const datasets = [
    {
      label: t('charts.forecast'),
      data: form.periods.map((p) => p.target_value),
      borderColor: '#f97316',
      backgroundColor: 'transparent',
    },
  ];

  return datasets;
});

onMounted(async () => {
  await fetchWithState();
});
</script>
