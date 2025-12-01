<template>
  <div class="w-full mx-auto bg-white rounded-lg" v-if="!actionControlStore.action?.is_planned">
    <div class="card-body p-4">
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <p class="text-lg text-red-600">
          {{ t('actionControl.noPlanningYet') }}
        </p>
      </div>
    </div>
  </div>
  <div
    class="w-full mx-auto bg-white rounded-lg"
    v-else-if="!actionControlStore.action?.is_in_progress"
  >
    <div class="card-body p-4">
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <p class="text-lg text-red-600">
          {{ t('actionControl.notInProgress') }}
        </p>
      </div>
    </div>
  </div>

  <div
    class="w-full mx-auto bg-white rounded-lg"
    v-else-if="actionControlStore.action?.can_control && actionControlStore.phases.length === 0"
  >
    <div class="card-body p-4">
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <p class="text-lg text-red-600">
          {{ t('actionControl.noMoreMilestones') }}
        </p>
      </div>
    </div>
  </div>

  <template v-else-if="actionControlStore.action?.can_control">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Control Date
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="control_date"
              name="control_date"
              type="date"
              :label="t('actionControl.form.controlDate')"
              :placeholder="t('actionControl.form.controlDatePlaceholder')"
              v-model="form.control_date"
              :error="form.errors.get('control_date')"
              :form="form"
              required
            />
          </div> -->

          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="action_period"
              name="action_period"
              v-model="form.action_period"
              :options="actionControlStore.periods"
              :label="t('actionControl.form.actionPeriod')"
              :placeholder="t('actionControl.form.actionPeriodPlaceholder')"
              :error="form.errors.get('action_period')"
              value-key="uuid"
              label-key="label"
              filterable
              clearable
              required
            />
          </div>

          <!-- Root cause -->
          <div class="col-span-12 md:col-span-8">
            <Textarea
              id="root_cause"
              name="root_cause"
              v-model="form.root_cause"
              :label="t('actionControl.form.rootCause')"
              :placeholder="t('actionControl.form.rootCausePlaceholder')"
              :error="form.errors.get('root_cause')"
              :rows="8"
            />
          </div>
        </div>
      </div>
    </div>

    <Alert
      v-if="alertStore.hasMessage"
      :type="alertStore.message.type"
      :message="alertStore.message.text"
      @close="alertStore.resetMessage()"
      class="my-4 col-span-12"
    />

    <div class="col-span-12">
      <table class="min-w-full text-sm bg-white border border-gray-200 table-auto mt-6">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border text-left w-2/5">
              {{ t('actionControl.phases.name') }}
            </th>
            <th class="p-2 border text-left w-1/8">
              {{ t('actionControl.phases.startDate') }}
            </th>
            <th class="p-2 border text-left w-1/8">
              {{ t('actionControl.phases.endDate') }}
            </th>
            <th class="p-2 border text-right w-1/12">
              {{ t('actionControl.phases.weight') }}
            </th>
            <th class="p-2 border text-left w-1/12">
              {{ t('actionControl.phases.progressPercent') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(phase, index) in actionControlStore.phases"
            :key="phase.uuid ?? index"
            class="hover:bg-gray-50"
          >
            <td class="p-2 border truncate">
              {{ phase.name }}
            </td>

            <td class="p-2 border">
              {{ phase.start_date }}
            </td>

            <td class="p-2 border">
              {{ phase.end_date }}
            </td>

            <td class="p-2 border text-right">{{ phase.weight }} %</td>

            <td class="p-2 border">
              <select
                :id="`progress_${index}`"
                :name="`phases.${index}.progress_percent`"
                v-model="phase.progress_percent"
                class="w-full p-1.5 border rounded focus:outline-none"
              >
                <option value="" disabled>
                  {{ t('actionControl.phases.progressPercentPlaceholder') }}
                </option>
                <option v-for="option in progressOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </td>
          </tr>

          <tr v-if="actionControlStore.phases.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-500">
              {{ t('actionControl.phases.noData') }}
            </td>
          </tr>
        </tbody>

        <tfoot class="bg-gray-50 font-medium">
          <tr>
            <td colspan="4" class="p-2 border text-right">
              {{ t('actionControl.phases.forecast') }}
            </td>
            <td class="p-2 border text-right">{{ forecastPercent }} %</td>
          </tr>
          <tr>
            <td colspan="4" class="p-2 border text-right">
              {{ t('actionControl.phases.actual') }}
            </td>
            <td class="p-2 border text-right">{{ actualProgressPercent }} %</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </template>
</template>

<script setup>
import { useActionControlStore, useAlertStore } from '@/store';

const actionControlStore = useActionControlStore();
const alertStore = useAlertStore();

const form = actionControlStore.form;

const progressOptions = computed(() => {
  const steps = actionControlStore.progressValues ?? [];
  return steps.map((v) => ({ value: v, label: `${v}%` }));
});

const forecastPercent = computed(() => {
  if (!form.action_period) return 0;

  const period = actionControlStore.periods.find((p) => p.uuid === form.action_period);

  return period ? Number(period.progress_percent ?? 0).toFixed(2) : 0;
});

const actualProgressPercent = computed(() => {
  return actionControlStore.phases
    .reduce((sum, p) => {
      return sum + ((Number(p.weight) || 0) * Number(p.progress_percent ?? 0)) / 100;
    }, 0)
    .toFixed(2);
});

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});
</script>
