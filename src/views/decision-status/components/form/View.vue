<template>
  <div class="w-full mx-auto bg-white rounded-lg">
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4">
        <!-- Author -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="author"
            name="author"
            :label="t('common.author')"
            :placeholder="t('common.author')"
            :modelValue="form.author"
          />
        </div>

        <!-- Control date -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="control_date"
            name="control_date"
            :label="t('actionControl.form.controlDate')"
            :placeholder="t('actionControl.form.controlDatePlaceholder')"
            :modelValue="form.control_date"
          />
        </div>

        <!-- Period -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="action_period"
            name="action_period"
            :label="t('actionControl.form.actionPeriod')"
            :placeholder="t('actionControl.form.actionPeriodPlaceholder')"
            :modelValue="form.action_period"
          />
        </div>

        <!-- Root cause -->
        <div class="col-span-12 md:col-span-8">
          <TextareaReadonly
            id="root_cause"
            name="root_cause"
            v-model="form.root_cause"
            :label="t('actionControl.form.rootCause')"
            :placeholder="t('actionControl.form.rootCausePlaceholder')"
            :rows="8"
          />
        </div>
      </div>
    </div>
  </div>

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
          <th class="p-2 border text-right w-1/12">
            {{ t('actionControl.phases.progressPercent') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(controPhase, index) in form.control_phases"
          :key="controPhase.uuid ?? index"
          class="hover:bg-gray-50"
        >
          <td class="p-2 border truncate">
            {{ controPhase.phase.name }}
          </td>

          <td class="p-2 border">
            {{ controPhase.phase.start_date }}
          </td>

          <td class="p-2 border">
            {{ controPhase.phase.end_date }}
          </td>

          <td class="p-2 border text-right">{{ controPhase.weight }} %</td>
          <td class="p-2 border text-right">{{ controPhase.progress_percent }} %</td>
        </tr>

        <tr v-if="form.control_phases.length === 0">
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

<script setup>
import { useActionControlStore } from '@/store';

const actionControlStore = useActionControlStore();

const form = actionControlStore.form;

const forecastPercent = computed(() => {
  return form.forecast_percent;
});

const actualProgressPercent = computed(() => {
  return form.control_phases
    .reduce((sum, p) => {
      return sum + ((Number(p.weight) || 0) * Number(p.progress_percent ?? 0)) / 100;
    }, 0)
    .toFixed(2);
});

</script>
