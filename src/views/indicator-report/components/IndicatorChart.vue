<template>
  <div>
    <LineChart
      v-if="progress.chart_type?.code === 'LINE'"
      :labels="labels"
      :datasets="datasets"
      :unit="progress.unit"
      :height="400"
    />

    <BarChart
      v-else-if="progress.chart_type?.code === 'BAR'"
      :labels="labels"
      :datasets="datasets"
      :unit="progress.unit"
      :height="400"
    />

    <PieChart
      v-else-if="progress.chart_type?.code === 'PIE'"
      :labels="labels"
      :datasets="datasets"
      :unit="progress.unit"
      :height="400"
    />

    <DoughnutGaugeChart
      v-else-if="progress.chart_type?.code === 'GAUGE'"
      :labels="labels"
      :datasets="datasets"
      :unit="progress.unit"
      :height="400"
    />

    <!-- fallback Table -->
    <table class="min-w-full text-sm bg-white border border-gray-200 table-auto mt-6">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border text-left w-1/5">
            {{ t('report.periods.period') }}
          </th>
          <th class="p-2 border text-right w-1/5">{{ t('report.periods.targetValue') }} (VC)</th>
          <th class="p-2 border text-right w-1/5">{{ t('report.periods.achievedValue') }} (VA)</th>
          <th class="p-2 border text-right w-1/5">{{ t('report.periods.variance') }} (VA - VC)</th>
          <th class="p-2 border text-right w-1/5">
            {{ t('report.periods.performanceIndex') }} (VA / VC)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in progress.rows" :key="index" class="hover:bg-gray-50">
          <td class="p-2 border truncate">{{ row.period }}</td>
          <td class="p-2 border text-right">{{ `${row.target_value} ${progress.unit}` }}</td>
          <td class="p-2 border text-right">
            {{ row.achieved_value !== null ? `${row.achieved_value} ${progress.unit}` : 'N/A' }}
          </td>
          <td class="p-2 border text-right">
            {{ row.variance !== null ? `${row.variance} ${progress.unit}` : 'N/A' }}
          </td>
          <td class="p-2 border text-right">
            {{ row.performance_index !== null ? row.performance_index : 'N/A' }}
          </td>
        </tr>

        <tr v-if="!progress.rows || progress.rows.length === 0">
          <td colspan="5" class="text-center py-4 border text-gray-500">
            {{ t('report.periods.noData') }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="p-2 text-right text-xl font-semibold">
            {{ t('report.periods.overallProgress') }} :
            {{ `${progress.overall_progress} ${progress.unit}` }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import LineChart from './LineChart.vue';
import BarChart from './BarChart.vue';
import PieChart from '@/components/ui/charts/PieChart.vue';
import DoughnutGaugeChart from './DoughnutGaugeChart.vue';

const { t } = useI18n();

const props = defineProps({
  progress: { type: Object, required: true },
});

const labels = computed(() => {
  if (props.progress.chart_type?.code === 'LINE' || props.progress.chart_type?.code === 'BAR') {
    return props.progress.rows.map((r) => r.period);
  }
  return [t('charts.forecast'), t('charts.actual')];
});

const datasets = computed(() => {
  if (props.progress.chart_type?.code === 'LINE' || props.progress.chart_type?.code === 'BAR') {
    return [
      {
        label: t('charts.forecast'),
        data: props.progress.rows.map((r) => r.target_value),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,0.3)',
      },
      {
        label: t('charts.actual'),
        data: props.progress.rows.map((r) => r.achieved_value ?? 0),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,0.3)',
      },
    ];
  }

  return [
    {
      data: props.progress.chart_type?.code === 'PIE' ? [props.progress.final_target_value, props.progress.overall_progress] : [props.progress.overall_progress, props.progress.final_target_value],
      backgroundColor: props.progress.chart_type?.code === 'PIE' ? ['#3b82f6', '#22c55e'] : ['#e5e7eb', '#22c55e'],
    },
  ];
});
</script>
