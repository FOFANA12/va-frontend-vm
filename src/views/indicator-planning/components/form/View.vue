<template>
  <div class="w-full mx-auto bg-white rounded-lg" v-if="form.periods.length === 0">
    <div class="card-body p-4">
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <p class="text-lg text-red-600">
          {{ t('indicatorPlanning.noPlanningYet') }}
        </p>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Start Date -->
          <div class="col-span-12 md:col-span-4 lg:col-span-3">
            <InputReadonly
              id="start_date"
              name="start_date"
              :label="t('indicatorPlanning.form.startDate')"
              :placeholder="t('indicatorPlanning.form.startDatePlaceholder')"
              :modelValue="form.start_date"
              readonly
            />
          </div>

          <!-- End Date -->
          <div class="col-span-12 md:col-span-4 lg:col-span-3">
            <InputReadonly
              id="end_date"
              name="end_date"
              :label="t('indicatorPlanning.form.endDate')"
              :placeholder="t('indicatorPlanning.form.endDatePlaceholder')"
              :modelValue="form.end_date"
              readonly
            />
          </div>

          <!-- Initial value -->
          <div class="col-span-12 md:col-span-4 lg:col-span-3">
            <InputReadonly
              id="initial_value"
              name="initial_value"
              :label="t('indicator.form.initialValue')"
              :placeholder="t('indicator.form.initialValuePlaceholder')"
              :modelValue="`${form.initial_value} ${form.unit}`"
            />
          </div>

          <!-- Final target value -->
          <div class="col-span-12 md:col-span-4 lg:col-span-3">
            <InputReadonly
              id="final_target_value"
              name="final_target_value"
              :label="t('indicator.form.finalTargetValue')"
              :placeholder="t('indicator.form.finalTargetValuePlaceholder')"
              :modelValue="`${form.final_target_value} ${form.unit}`"
            />
          </div>

          <!-- Frequency unit -->
          <div class="col-span-12 md:col-span-4 lg:col-span-3">
            <InputReadonly
              id="frequency_unit"
              name="frequency_unit"
              :label="t('indicatorPlanning.form.frequencyUnit')"
              :placeholder="t('indicatorPlanning.form.frequencyUnitPlaceholder')"
              :modelValue="form.frequency_unit"
              readonly
            />
          </div>

          <!-- Frequency value -->
          <div class="col-span-12 md:col-span-4 lg:col-span-3">
            <InputReadonly
              id="frequency_value"
              name="frequency_value"
              :label="t('indicatorPlanning.form.frequencyValue')"
              :placeholder="t('indicatorPlanning.form.frequencyValuePlaceholder')"
              :modelValue="form.frequency_value"
              readonly
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Planning periods -->
    <div class="col-span-12">
      <table class="min-w-full text-sm bg-white border border-gray-200 table-auto mt-6">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border text-left w-1/3">
              {{ t('indicatorPlanning.periods.startDate') }}
            </th>
            <th class="p-2 border text-left w-1/3">
              {{ t('indicatorPlanning.periods.endDate') }}
            </th>
            <th class="p-2 border text-left w-1/6">
              {{ t('indicatorPlanning.periods.targetValue') }}
            </th>
            <!-- <th class="p-2 border text-left w-1/6">
              {{ t('indicatorPlanning.periods.achievedValue') }}
            </th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(period, index) in form.periods" :key="index" class="hover:bg-gray-50">
            <td class="p-2 border truncate">
              {{ formatDate(period.start_date) }}
            </td>
            <td class="p-2 border truncate">
              {{ formatDate(period.end_date) }}
            </td>
            <td class="p-2 border">
              {{ `${Number(period.target_value)}  ${form.unit}` }}
            </td>
            <!-- <td class="p-2 border">
              {{ `${Number(period.achieved_value)} ${form.unit}` }}
            </td> -->
          </tr>

          <tr v-if="form.periods.length === 0">
            <td colspan="3" class="text-center py-4 text-gray-500">
              {{ t('indicatorPlanning.periods.noData') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useIndicatorPlanningStore } from '@/store';
import { useDateTimeFormatter } from '@/composables/useDateTimeFormatter';
const { formatDate } = useDateTimeFormatter();
const { t } = useI18n();

const indicatorPlanningStore = useIndicatorPlanningStore();
const form = indicatorPlanningStore.form;

const props = defineProps({
  isPlanned: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
