<template>
  <!-- Acquisition par source de financement -->
  <div class="w-full mx-auto rounded-lg mb-6">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2">
        {{ t('report.sections.acquisitionsByFundingSource') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>

    <!-- Tableau -->
    <div class="card-body pt-4">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-white text-left">
            <th class="px-4 py-2 border-b border-gray-200">{{ t('report.fundingSource') }}</th>
            <th class="px-4 py-2 border-b border-gray-200">{{ t('report.totalAmount') }}</th>
            <th class="px-4 py-2 border-b border-gray-200">{{ t('report.participationRate') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="src in acquisitionsByFundingSource"
            :key="src.uuid"
            class="hover:bg-gray-50 bg-white"
          >
            <td class="px-4 py-2 border-b border-gray-200">{{ src.name }}</td>
            <td class="px-4 py-2 border-b border-gray-200 font-bold">
              {{ formatCurrency(src.total_amount, currentCurrencyCode) }}
            </td>
            <td class="px-4 py-2 border-b border-gray-200 text-blue-600 font-semibold">
              {{ calcParticipation(src.total_amount, acquisitionsByFundingSourceTotal) }} %
            </td>
          </tr>
          <tr v-if="acquisitionsByFundingSource.length === 0" class="bg-white">
            <td colspan="3" class="text-center text-gray-400 py-4">
              {{ t('report.noData') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Graphique -->
    <div class="card-body pt-4" v-if="acquisitionsByFundingSource.length > 0">
      <HorizontalBarChart
        :labels="acquisitionsByFundingSource.map((src) => src.name)"
        :datasets="[
          {
            label: t('report.participationRate'),
            data: acquisitionsByFundingSource.map((src) =>
              calcParticipation(src.total_amount, acquisitionsByFundingSourceTotal)
            ),
            backgroundColor: fundingSourceColors,
          },
        ]"
        unit="%"
      />
    </div>
  </div>

  <!-- Acquisition par devise -->
  <div class="w-full mx-auto rounded-lg">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2">
        {{ t('report.sections.acquisitionsByCurrency') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>

    <!-- Tableau -->
    <div class="card-body pt-4">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-white text-left">
            <th class="px-4 py-2 border-b border-gray-200">{{ t('report.currency') }}</th>
            <th class="px-4 py-2 border-b border-gray-200">{{ t('report.totalAmount') }}</th>
            <th class="px-4 py-2 border-b border-gray-200">{{ t('report.participationRate') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cur in acquisitionsByCurrency"
            :key="cur.uuid"
            class="hover:bg-gray-50 bg-white"
          >
            <td class="px-4 py-2 border-b border-gray-200">{{ cur.name }} ({{ cur.code }})</td>
            <td class="px-4 py-2 border-b border-gray-200 font-bold">
              {{ formatCurrency(cur.total_amount, cur.code) }}
            </td>
            <td class="px-4 py-2 border-b border-gray-200 text-green-600 font-semibold">
              {{ calcParticipation(cur.total_amount, acquisitionsByCurrencyTotal) }} %
            </td>
          </tr>
          <tr v-if="acquisitionsByCurrency.length === 0" class="bg-white">
            <td colspan="3" class="text-center text-gray-400 py-4">
              {{ t('report.noData') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Graphique -->
    <div class="card-body pt-4" v-if="acquisitionsByCurrency.length > 0">
      <PieChart
        :labels="acquisitionsByCurrency.map((c) => `${c.code}`)"
        :datasets="[
          {
            data: acquisitionsByCurrency.map((c) => Number(c.total_amount) || 0),
            backgroundColor: currencyColors,
          },
        ]"
        unit=""
        :height="300"
      />
    </div>
  </div>
</template>

<script setup>
import { useSettingsCurrencyStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import HorizontalBarChart from '@/components/ui/charts/HorizontalBarChart.vue';
import PieChart from '@/components/ui/charts/PieChart.vue';
import chroma from 'chroma-js';

const { t } = useI18n();
const currencyStore = useSettingsCurrencyStore();
const { formatCurrency } = useCurrencyFormatter();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const acquisitionsByFundingSource = computed(
  () => props.data?.acquisitions_by_funding_source || []
);
const acquisitionsByCurrency = computed(() => props.data?.acquisitions_by_currency || []);

const acquisitionsByFundingSourceTotal = computed(() =>
  acquisitionsByFundingSource.value.reduce((sum, item) => sum + (Number(item.total_amount) || 0), 0)
);

const acquisitionsByCurrencyTotal = computed(() =>
  acquisitionsByCurrency.value.reduce((sum, item) => sum + (Number(item.total_amount) || 0), 0)
);

const currentCurrencyCode = computed(() => {
  return currencyStore.defaultCurrency?.code || 'MRU';
});

const fundingSourceColors = computed(() =>
  chroma.scale('Set2').mode('lch').colors(acquisitionsByFundingSource.value.length)
);
const currencyColors = computed(() =>
  chroma.scale('Set3').mode('lch').colors(acquisitionsByCurrency.value.length)
);

/**
 * Calcule le pourcentage de participation
 */
function calcParticipation(amount, total) {
  if (!total || total === 0) return 0;
  return ((amount / total) * 100).toFixed(1);
}
</script>
