<template>
  <div class="w-full mx-auto rounded-lg">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Budget Prévisionnel -->
      <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p class="text-sm font-semibold text-indigo-700 mb-1">
          {{ t('dashboard.plannedBudget') }}
        </p>
        <p class="text-2xl font-bold text-indigo-900 format-number">
          {{ formatCurrency(reportData?.planned_budget ?? 0, currentCurrencyCode) }}
        </p>
      </div>

      <!-- Budget Acquis -->
      <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p class="text-sm font-semibold text-emerald-700 mb-1">
          {{ t('dashboard.acquiredBudget') }}
        </p>
        <p class="text-2xl font-bold text-emerald-900 format-number">
          {{ formatCurrency(reportData?.acquired_budget ?? 0, currentCurrencyCode) }}
        </p>
      </div>

      <!-- Budget Consommé -->
      <div class="p-4 bg-rose-50 border border-rose-200 rounded-lg">
        <p class="text-sm font-semibold text-rose-700 mb-1">
          {{ t('dashboard.spentBudget') }}
        </p>
        <p class="text-2xl font-bold text-rose-900 format-number">
          {{ formatCurrency(reportData?.spent_budget ?? 0, currentCurrencyCode) }}
        </p>
      </div>

      <!-- Budget Disponible -->
      <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <p class="text-sm font-semibold text-sky-700 mb-1">
          {{ t('dashboard.availableBudget') }}
        </p>
        <p class="text-2xl font-bold text-sky-900 format-number">
          {{ formatCurrency(reportData?.available_budget ?? 0, currentCurrencyCode) }}
        </p>
      </div>

      <!-- Budget à Mobiliser -->
      <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p class="text-sm font-semibold text-amber-700 mb-1">
          {{ t('dashboard.budgetToMobilize') }}
        </p>
        <p class="text-2xl font-bold text-amber-900 format-number">
          {{ formatCurrency(reportData?.budget_to_mobilize ?? 0, currentCurrencyCode) }}
        </p>
      </div>
    </div>

    <!-- DÉCAISSEMENT PAR TYPE DE BUDGET -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.disbursementByBudgetTypes') }}
      </h3>

      <div v-if="!reportData?.disbursement_by_budget_types?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noDisbursementBudgetTypeData') }}
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="row in reportData.disbursement_by_budget_types"
          :key="row.type"
          class="p-4 rounded-lg border"
          style="border-color: #0284c7; background-color: #0284c720"
        >
          <p class="text-sm font-semibold mb-1 text-sky-700">
            {{ row.type }}
          </p>

          <p class="text-xl font-bold text-sky-900 format-number">
            {{ formatCurrency(row.total, currentCurrencyCode) }}
          </p>

          <p class="text-sm text-sky-700">{{ row.percent }} %</p>
        </div>
      </div>
    </div>

    <!-- DÉCAISSEMENT PAR TYPE DE DÉPENSE -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.disbursementByExpenseTypes') }}
      </h3>

      <div v-if="!reportData?.disbursement_by_expense_types?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noDisbursementExpenseTypeData') }}
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="row in reportData.disbursement_by_expense_types"
          :key="row.type"
          class="p-4 rounded-lg border"
          style="border-color: #d946ef; background-color: #d946ef20"
        >
          <p class="text-sm font-semibold mb-1 text-fuchsia-700">
            {{ row.type }}
          </p>

          <p class="text-xl font-bold text-fuchsia-900 format-number">
            {{ formatCurrency(row.total, currentCurrencyCode) }}
          </p>

          <p class="text-sm text-fuchsia-700">{{ row.percent }} %</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsCurrencyStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';

const currencyStore = useSettingsCurrencyStore();
const { formatCurrency } = useCurrencyFormatter();

const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  },
});

const currentCurrencyCode = computed(() => {
  return props.reportData?.currency || currencyStore.defaultCurrency?.code;
});
</script>
