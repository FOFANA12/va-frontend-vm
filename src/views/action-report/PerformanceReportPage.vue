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
        :to="{ name: 'action' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
      >
        {{ t('action.btnList') }}
      </LinkButton>
    </div>

    <div class="w-full mx-auto rounded-lg">
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
              {{ budgetReport?.disbursement_rate ?? 0 }} %
            </span>
          </li>
          <li class="flex justify-between py-1">
            <span>{{ t('report.costVariance') }}</span>
            <span
              class="format-number"
              :class="
                budgetReport?.cost_variance > 0
                  ? 'text-red-600 font-bold'
                  : 'text-green-600 font-bold'
              "
            >
              {{ formatCurrency(budgetReport?.cost_variance, currentCurrencyCode) }}
            </span>
          </li>
          <li class="flex justify-between py-1">
            <span>{{ t('report.overrunRate') }}</span>
            <span
              class="font-bold format-number"
              :class="
                (budgetReport?.overrun_rate ?? 0) > 0
                  ? 'text-red-600 font-bold'
                  : 'text-green-600 font-bold'
              "
            >
              {{ budgetReport?.overrun_rate ?? 0 }} %
            </span>
          </li>
        </ul>

        <!---->
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

    <div class="w-full mx-auto rounded-lg mt-6">
      <div class="card-header">
        <h2
          class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200"
        >
          {{ t('report.sections.realizationReport') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="col-span-12">
        <table class="min-w-full text-sm bg-white border border-gray-200 table-auto mt-6">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 border text-left w-1/5">
                {{ t('report.periods.period') }}
              </th>
              <th class="p-2 border text-right w-1/5">{{ t('report.periods.planned') }} (P)</th>
              <th class="p-2 border text-right w-1/5">{{ t('report.periods.realized') }} (Tr)</th>
              <th class="p-2 border text-right w-1/5">
                {{ t('report.periods.variance') }} (Tr - P)
              </th>
              <th class="p-2 border text-right w-1/5">
                {{ t('report.periods.performanceIndex') }} (Tr / P)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in result.progress.rows" :key="index" class="hover:bg-gray-50">
              <td class="p-2 border truncate">{{ row.period }}</td>
              <td class="p-2 border text-right">{{ row.planned_percent }} %</td>
              <td class="p-2 border text-right">
                {{ row.realized_percent !== null ? row.realized_percent + ' %' : 'N/A' }}
              </td>
              <td class="p-2 border text-right">
                {{ row.variance !== null ? row.variance + ' %' : 'N/A' }}
              </td>
              <td class="p-2 border text-right">
                {{ row.performance_index !== null ? row.performance_index : 'N/A' }}
              </td>
            </tr>

            <tr v-if="!result.progress.rows || result.progress.rows.length === 0">
              <td colspan="5" class="text-center py-4 text-gray-500">
                {{ t('report.periods.noData') }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5" class="p-2 border text-right text-xl font-semibold">
                % {{ t('report.periods.overallProgress') }} :
                {{ result.progress.overall_progress }} %
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <div class="w-full mx-auto rounded-lg mt-6">
      <div class="card-header">
        <h2
          class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200"
        >
          {{ t('report.sections.delayReport') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="col-span-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <!-- Début prévu -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-blue-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  {{ t('report.delay.plannedStart') }}
                </p>
              </div>
              <p class="text-lg font-bold text-blue-900">
                {{ delayReport?.planned_start ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Fin prévue -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-purple-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                  {{ t('report.delay.plannedEnd') }}
                </p>
              </div>
              <p class="text-lg font-bold text-purple-900">
                {{ delayReport?.planned_end ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Durée prévue -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-indigo-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                  {{ t('report.delay.plannedDuration') }}
                </p>
              </div>
              <p class="text-lg font-bold text-indigo-900">
                {{ delayReport?.planned_duration_days ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Jours avant le début -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-teal-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-teal-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  {{ t('report.delay.daysToStart') }}
                </p>
              </div>
              <p class="text-lg font-bold text-teal-900">
                {{ delayReport?.days_to_start ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Début réel -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-emerald-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  {{ t('report.delay.actualStart') }}
                </p>
              </div>
              <p class="text-lg font-bold text-emerald-900">
                {{ delayReport?.actual_start ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Fin réelle -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-cyan-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-cyan-700 uppercase tracking-wider">
                  {{ t('report.delay.actualEnd') }}
                </p>
              </div>
              <p class="text-lg font-bold text-cyan-900">
                {{ delayReport?.actual_end ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Durée réelle -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-orange-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  {{ t('report.delay.actualDuration') }}
                </p>
              </div>
              <p class="text-lg font-bold text-orange-900">
                {{ delayReport?.actual_duration_days ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Jours restants -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-rose-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-rose-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-rose-700 uppercase tracking-wider">
                  {{ t('report.delay.remainingDays') }}
                </p>
              </div>
              <p class="text-lg font-bold text-rose-900">
                {{ delayReport?.remaining_days ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Retard de démarrage -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-red-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-red-700 uppercase tracking-wider">
                  {{ t('report.delay.startDelay') }}
                </p>
              </div>
              <p class="text-lg font-bold text-red-900">
                {{ delayReport?.start_delay_days ?? '–' }}
              </p>
            </div>
          </div>

          <!-- Écart de durée -->
          <div
            class="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-amber-200 rounded-lg">
                  <svg
                    class="w-4 h-4 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    ></path>
                  </svg>
                </div>
                <p class="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  {{ t('report.delay.durationVariance') }}
                </p>
              </div>
              <p class="text-lg font-bold text-amber-900">
                {{ delayReport?.duration_variance_days ?? '–' }}
              </p>
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
          {{ t('report.sections.prCourbeReport') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body pt-4">
        <PerformanceLineChart
          v-if="chartLabels.length"
          :labels="chartLabels"
          :datasets="chartDatasets"
          unit="%"
          :height="400"
        />

        <div
          v-else
          class="text-center py-10 text-gray-500 border border-dashed border-gray-300 rounded-lg"
        >
          {{ t('report.periods.noData') }}
        </div>
      </div>
    </div>
  </PageStateWrapper>
</template>
  
  <script setup>
import { useActionReportStore, useSettingsCurrencyStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
const { formatCurrency } = useCurrencyFormatter();
import PerformanceLineChart from '@/components/ui/charts/PerformanceLineChart.vue';

const { t } = useI18n();
const route = useRoute();
const store = useActionReportStore();
const currencyStore = useSettingsCurrencyStore();
const result = ref(null);

const currentCurrencyCode = computed(() => {
  return result.value?.budget.currency || currencyStore.defaultCurrency?.code;
});

const budgetReport = computed(() => {
  return result.value?.budget;
});

const delayReport = computed(() => {
  return result.value?.delay;
});

const chartLabels = computed(() => {
  return (result.value.progress.rows || []).map((p, idx) => `P${idx + 1} (${p.period})`);
});

const chartDatasets = computed(() => {
  if (!result.value.progress.rows) return [];

  const datasets = [
    {
      label: t('charts.forecast'),
      data: result.value.progress.rows.map((p) => p.planned_percent),
      borderColor: '#f97316',
      backgroundColor: 'transparent',
    },
  ];

  if (showActual.value) {
    datasets.push({
      label: t('charts.actual'),
      data: result.value.progress.rows.map((p) => p.realized_percent),
      borderColor: '#22c55e',
      backgroundColor: 'transparent',
    });
  }

  return datasets;
});

const showActual = computed(() => {
  if (!result.value.progress.rows || !result.value.progress.rows.length) return false;
  return result.value.progress.rows.some((p) => p.realized_percent > 0);
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  result.value = await store.getPerformanceReport(route.params.id);
});

onMounted(async () => {
  await fetchWithState();
});
</script>
  