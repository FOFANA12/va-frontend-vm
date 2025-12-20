<template>
  <div class="w-full mx-auto rounded-lg">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Actions Count -->
      <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p class="text-sm font-semibold text-indigo-700 mb-1">
          {{ t('dashboard.actionsCount') }}
        </p>
        <p class="text-2xl font-bold text-indigo-900">
          {{ reportData?.actions_count ?? 0 }}
        </p>
      </div>

      <!-- Realization Rate -->
      <div class="p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <p class="text-sm font-semibold text-teal-700 mb-1">
          {{ t('dashboard.realizationRate') }}
        </p>
        <p class="text-2xl font-bold text-teal-900">{{ reportData?.realization_rate ?? 0 }} %</p>
      </div>

      <!-- Disbursement Rate -->
      <div class="p-4 bg-rose-50 border border-rose-200 rounded-lg">
        <p class="text-sm font-semibold text-rose-700 mb-1">
          {{ t('dashboard.disbursementRate') }}
        </p>
        <p class="text-2xl font-bold text-rose-900">{{ reportData?.disbursement_rate ?? 0 }} %</p>
      </div>

      <!-- Realization Index -->
      <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <p class="text-sm font-semibold text-slate-700 mb-1">
          {{ t('dashboard.realizationIndex') }}
        </p>
        <p class="text-2xl font-bold text-slate-900">
          {{ reportData?.realization_index ?? 0 }}
        </p>
      </div>

      <!-- Failed Actions -->
      <div class="p-4 bg-red-50 border border-red-200 rounded-lg relative">
        <p class="text-sm font-semibold text-red-700 mb-1">
          {{ t('dashboard.failedActions') }}
        </p>

        <p class="text-2xl font-bold text-red-900">
          {{ reportData?.failed_actions_count ?? 0 }} /
          {{ reportData?.actions_count ?? 0 }}
        </p>

        <router-link
          :to="{ name: 'action', query: { nature: 'failed' } }"
          class="text-xs text-red-700 underline absolute bottom-2 right-4 hover:text-red-900"
        >
          {{ t('dashboard.seeDetails') }}
        </router-link>
      </div>

      <!-- Alert Actions -->
      <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg relative">
        <p class="text-sm font-semibold text-orange-700 mb-1">
          {{ t('dashboard.alertActions') }}
        </p>

        <p class="text-2xl font-bold text-orange-900">
          {{ reportData?.alert_actions_count ?? 0 }} /
          {{ reportData?.actions_count ?? 0 }}
        </p>

        <router-link
          :to="{ name: 'action', query: { nature: 'alert' } }"
          class="text-xs text-orange-700 underline absolute bottom-2 right-4 hover:text-orange-900"
        >
          {{ t('dashboard.seeDetails') }}
        </router-link>
      </div>
    </div>

    <!-- Actions Status Distribution -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.actionsStatusDistribution') }}
      </h3>

      <!-- Si vide -->
      <div v-if="!reportData?.actions_status_distribution?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noActionsStatusData') }}
      </div>

      <!-- Sinon afficher les cartes -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="status in reportData.actions_status_distribution"
          :key="status.code"
          class="p-4 rounded-lg border"
          :style="{
            borderColor: status.color,
            backgroundColor: status.color + '20',
          }"
        >
          <p class="text-sm font-semibold mb-1" :style="{ color: status.color }">
            {{ status.name }}
          </p>

          <p class="text-2xl font-bold" :style="{ color: status.color }">
            {{ status.count }} / {{ reportData?.actions_count ?? 0 }}
          </p>
        </div>
      </div>
    </div>

    <!-- Actions State Distribution -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.actionsStateDistribution') }}
      </h3>

      <!-- Si vide -->
      <div v-if="!reportData?.actions_state_distribution?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noActionsStateData') }}
      </div>

      <!-- Sinon afficher -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="state in reportData.actions_state_distribution"
          :key="state.code"
          class="p-4 rounded-lg border"
          :style="{
            borderColor: state.color,
            backgroundColor: state.color + '20',
          }"
        >
          <p class="text-sm font-semibold mb-1" :style="{ color: state.color }">
            {{ state.name }}
          </p>

          <p class="text-2xl font-bold" :style="{ color: state.color }">
            {{ state.count }} / {{ reportData?.actions_count ?? 0 }}
          </p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  },
});
</script>
