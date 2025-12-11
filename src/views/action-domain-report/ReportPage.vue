<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <!-- Action buttons -->
    <div class="flex justify-end mt-4 gap-4">
      <LinkButton
        :to="{ name: 'actionDomain' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
      >
        {{ t('actionDomain.btnList') }}
      </LinkButton>
    </div>

    <div class="w-full mx-auto rounded-lg">
      <div class="card-header">
        <h2
          class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200"
        >
          {{ t('report.sections.counters') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body pt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Strategic Domains -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <p class="text-sm font-semibold text-blue-700 mb-1 tracking-wider">
                {{ t('report.counts.strategicDomains') }}
              </p>
              <p class="text-3xl font-bold text-blue-900">{{ counterReport?.strategic_domains }}</p>
            </div>
          </div>

          <!-- Capability Domains -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <p class="text-sm font-semibold text-purple-700 mb-1 tracking-wider">
                {{ t('report.counts.capabilityDomains') }}
              </p>
              <p class="text-3xl font-bold text-purple-900">
                {{ counterReport?.capability_domains }}
              </p>
            </div>
          </div>

          <!-- Elementary Levels -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <p class="text-sm font-semibold text-amber-700 mb-1 tracking-wider">
                {{ t('report.counts.elementaryLevels') }}
              </p>
              <p class="text-3xl font-bold text-amber-900">
                {{ counterReport?.elementary_levels }}
              </p>
            </div>
          </div>

          <!-- Actions Count -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <p class="text-sm font-semibold text-emerald-700 mb-1 tracking-wider">
                {{ t('report.counts.actions') }}
              </p>
              <p class="text-3xl font-bold text-emerald-900">{{ counterReport?.actions }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto rounded-lg mt-6">
      <div class="card-header">
        <h2
          class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200"
        >
          {{ t('report.sections.budgetReport') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body pt-4">
        <!-- KPI -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <!-- Planned Budget Card -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 bg-amber-200 rounded-lg">
                  <svg
                    class="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-sm font-semibold text-amber-700 mb-1 tracking-wider">
                {{ t('report.plannedBudget') }}
              </p>
              <p class="text-lg font-bold text-amber-900 format-number">
                {{ formatCurrency(budgetReport?.planned_budget, currentCurrencyCode) }}
              </p>
            </div>
          </div>

          <!-- Acquired Budget Card -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 bg-blue-200 rounded-lg">
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-sm font-semibold text-blue-700 mb-1 tracking-wider">
                {{ t('report.acquiredBudget') }}
              </p>
              <p class="text-lg font-bold text-blue-900 format-number">
                {{ formatCurrency(budgetReport?.acquired_budget, currentCurrencyCode) }}
              </p>
            </div>
          </div>

          <!-- Spent Budget Card -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-rose-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 bg-rose-200 rounded-lg">
                  <svg
                    class="w-5 h-5 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-sm font-semibold text-rose-700 mb-1 tracking-wider">
                {{ t('report.spentBudget') }}
              </p>
              <p class="text-lg font-bold text-rose-900 format-number">
                {{ formatCurrency(budgetReport?.spent_budget, currentCurrencyCode) }}
              </p>
            </div>
          </div>

          <!-- Available Budget Card -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 bg-emerald-200 rounded-lg">
                  <svg
                    class="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
              </div>
              <p class="text-sm font-semibold text-emerald-700 mb-1 tracking-wider">
                {{ t('report.availableBudget') }}
              </p>
              <p class="text-lg font-bold text-emerald-900 format-number">
                {{ formatCurrency(budgetReport?.available_budget, currentCurrencyCode) }}
              </p>
            </div>
          </div>
        </div>

        <ul class="divide-y divide-gray-200 bg-white rounded-lg p-4 mb-6">
          <li class="flex justify-between py-1">
            <span>{{ t('report.budgetToMobilize') }}</span>
            <span class="format-number text-red-600 font-bold">
              {{ formatCurrency(budgetReport?.budget_to_mobilize, currentCurrencyCode) }}
            </span>
          </li>
          <li class="flex justify-between py-1">
            <span>{{ t('report.disbursementRate') }}</span>
            <span class="font-bold text-green-600 format-number">
              {{ budgetReport?.average_disbursement_rate ?? 0 }} %
            </span>
          </li>
          <li class="flex justify-between py-1">
            <span>{{ t('report.realizationRate') }}</span>
            <span
              class="font-bold format-number"
              :class="
                budgetReport?.average_realisation_rate <= 0
                  ? 'text-red-600 font-bold'
                  : 'text-green-600 font-bold'
              "
            >
              {{ budgetReport?.average_realisation_rate ?? 0 }} %
            </span>
          </li>
        </ul>

        <div class="bg-white border rounded-lg p-4 pt-2">
          <h3 class="text-md font-semibold mb-2">
            {{ t('report.disbursementByType') }}
          </h3>
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 text-left text-sm font-medium text-gray-600">
                <th class="px-4 py-2 border">{{ t('report.budgetType') }}</th>
                <th class="px-4 py-2 border">{{ t('report.totalDisbursed') }}</th>
                <th class="px-4 py-2 border">% {{ t('report.disbursement') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, idx) in budgetReport?.disbursement_types || []"
                :key="idx"
                class="text-sm text-gray-700"
              >
                <td class="px-4 py-2 border">{{ item.type }}</td>
                <td class="px-4 py-2 border font-bold format-number">
                  {{ formatCurrency(item.total, currentCurrencyCode) }}
                </td>
                <td class="px-4 py-2 border">{{ item.percent }} %</td>
              </tr>
              <tr v-if="!budgetReport?.disbursement_types?.length">
                <td colspan="3" class="text-center text-gray-400 py-4">
                  {{ t('report.noDisbursements') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </PageStateWrapper>
</template>
  
  <script setup>
import { useActionDomainStore, useSettingsCurrencyStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
const { formatCurrency } = useCurrencyFormatter();

const { t } = useI18n();
const route = useRoute();
const store = useActionDomainStore();
const currencyStore = useSettingsCurrencyStore();
const result = ref(null);

const currentCurrencyCode = computed(() => {
  return result.value?.budget.currency || currencyStore.defaultCurrency?.code;
});

const counterReport = computed(() => {
  return result.value?.counts;
});

const budgetReport = computed(() => {
  return result.value?.budget;
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  result.value = await store.getGlobalReport(route.params.id);
});

onMounted(async () => {
  await fetchWithState();
});
</script>
  