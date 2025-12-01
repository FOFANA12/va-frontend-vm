<template>
  <!-- Dépenses par structure -->
  <div class="w-full mx-auto rounded-lg mb-6" v-if="expensesByStructure.length > 0">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2">
        {{ t('report.sections.expensesByStructure') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <TableWithParticipation
        :items="expensesByStructure"
        labelKey="name"
        valueKey="total_amount"
        :total="expensesByStructureTotal"
        :currency="currentCurrencyCode"
      />
    </div>
    <div class="card-body pt-4">
      <PieChart
        :labels="expensesByStructure.map((s) => s.abbreviation)"
        :datasets="[
          {
            data: expensesByStructure.map((s) => Number(s.total_amount) || 0),
            backgroundColor: structureColors,
          },
        ]"
        :height="500"
        unit=""
      />
    </div>
  </div>

  <!-- Dépenses par type de budget -->
  <div class="w-full mx-auto rounded-lg mb-6" v-if="expensesByBudgetType.length > 0">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2">
        {{ t('report.sections.expensesByBudgetType') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <TableWithParticipation
        :items="expensesByBudgetType"
        labelKey="name"
        valueKey="total_amount"
        :total="expensesByBudgetTypeTotal"
        :currency="currentCurrencyCode"
      />
    </div>
    <div class="card-body pt-4">
      <HorizontalBarChart
        :labels="expensesByBudgetType.map((b) => b.name)"
        :datasets="[
          {
            label: t('report.participationRate'),
            data: expensesByBudgetType.map((b) =>
              calcParticipation(b.total_amount, expensesByBudgetTypeTotal)
            ),
            backgroundColor: budgetColors,
          },
        ]"
        unit="%"
      />
    </div>
  </div>

  <!-- Dépenses par type de dépense -->
  <div class="w-full mx-auto rounded-lg mb-6" v-if="expensesByExpenseType.length > 0">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2">
        {{ t('report.sections.expensesByExpenseType') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <TableWithParticipation
        :items="expensesByExpenseType"
        labelKey="name"
        valueKey="total_amount"
        :total="expensesByExpenseTypeTotal"
        :currency="currentCurrencyCode"
      />
    </div>
    <div class="card-body pt-4">
      <HorizontalBarChart
        :labels="expensesByExpenseType.map((e) => e.name)"
        :datasets="[
          {
            label: t('report.participationRate'),
            data: expensesByExpenseType.map((e) =>
              calcParticipation(e.total_amount, expensesByExpenseTypeTotal)
            ),
            backgroundColor: expenseColors,
          },
        ]"
        unit="%"
      />
    </div>
  </div>

  <!-- Dépenses par mode de passation -->
  <div class="w-full mx-auto rounded-lg mb-6" v-if="expensesByProcurementMode.length > 0">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2">
        {{ t('report.sections.expensesByProcurementMode') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <TableWithParticipation
        :items="expensesByProcurementMode"
        labelKey="name"
        valueKey="total_amount"
        :total="expensesByProcurementModeTotal"
        :currency="currentCurrencyCode"
      />
    </div>
    <div class="card-body pt-4">
      <HorizontalBarChart
        :labels="expensesByProcurementMode.map((m) => m.name)"
        :datasets="[
          {
            label: t('report.participationRate'),
            data: expensesByProcurementMode.map((m) =>
              calcParticipation(m.total_amount, expensesByProcurementModeTotal)
            ),
            backgroundColor: procurementColors,
          },
        ]"
        unit="%"
      />
    </div>
  </div>

  <!-- Dépenses par type de contrat -->
  <div class="w-full mx-auto rounded-lg" v-if="expensesByContractType.length > 0">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2">
        {{ t('report.sections.expensesByContractType') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <TableWithParticipation
        :items="expensesByContractType"
        labelKey="name"
        valueKey="total_amount"
        :total="expensesByContractTypeTotal"
        :currency="currentCurrencyCode"
      />
    </div>
    <div class="card-body pt-4">
      <HorizontalBarChart
        :labels="expensesByContractType.map((c) => c.name)"
        :datasets="[
          {
            label: t('report.participationRate'),
            data: expensesByContractType.map((c) =>
              calcParticipation(c.total_amount, expensesByContractTypeTotal)
            ),
            backgroundColor: contractColors,
          },
        ]"
        unit="%"
      />
    </div>
  </div>
</template>

<script setup>
import { useSettingsCurrencyStore } from '@/store';
import HorizontalBarChart from '@/components/ui/charts/HorizontalBarChart.vue';
import PieChart from '@/components/ui/charts/PieChart.vue';
import chroma from 'chroma-js';

import TableWithParticipation from './TableWithParticipation.vue';

const { t } = useI18n();
const currencyStore = useSettingsCurrencyStore();

const props = defineProps({
  data: { type: Object, default: () => ({}) },
});

const expensesByBudgetType = computed(() => props.data?.expenses_by_budget_type || []);
const expensesByExpenseType = computed(() => props.data?.expenses_by_expense_type || []);
const expensesByStructure = computed(() => props.data?.expenses_by_structure || []);
const expensesByProcurementMode = computed(() => props.data?.expenses_by_procurement_mode || []);
const expensesByContractType = computed(() => props.data?.expenses_by_contract_type || []);

const expensesByStructureTotal = computed(() =>
  expensesByStructure.value.reduce((sum, i) => sum + (Number(i.total_amount) || 0), 0)
);
const expensesByBudgetTypeTotal = computed(() =>
  expensesByBudgetType.value.reduce((sum, i) => sum + (Number(i.total_amount) || 0), 0)
);
const expensesByExpenseTypeTotal = computed(() =>
  expensesByExpenseType.value.reduce((sum, i) => sum + (Number(i.total_amount) || 0), 0)
);
const expensesByProcurementModeTotal = computed(() =>
  expensesByProcurementMode.value.reduce((sum, i) => sum + (Number(i.total_amount) || 0), 0)
);
const expensesByContractTypeTotal = computed(() =>
  expensesByContractType.value.reduce((sum, i) => sum + (Number(i.total_amount) || 0), 0)
);

const budgetColors = computed(() =>
  chroma.scale('Set2').mode('lch').colors(expensesByBudgetType.value.length)
);
const expenseColors = computed(() =>
  chroma.scale('Paired').mode('lch').colors(expensesByExpenseType.value.length)
);
const structureColors = computed(() =>
  chroma.scale('Set3').mode('lch').colors(expensesByStructure.value.length)
);
const procurementColors = computed(() =>
  chroma.scale('Dark2').mode('lch').colors(expensesByProcurementMode.value.length)
);
const contractColors = computed(() =>
  chroma.scale('Pastel1').mode('lch').colors(expensesByContractType.value.length)
);

const currentCurrencyCode = computed(() => currencyStore.defaultCurrency?.code || 'MRU');

function calcParticipation(amount, total) {
  if (!total || total === 0) return 0;
  return ((amount / total) * 100).toFixed(1);
}
</script>
