<template>
  <div class="w-full mx-auto bg-white rounded-lg">
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4">
        <!-- Start Date -->
        <div class="col-span-12 md:col-span-4 lg:col-span-3">
          <Input
            id="start_date"
            name="start_date"
            type="date"
            :label="t('actionPlanning.form.startDate')"
            :placeholder="t('actionPlanning.form.startDatePlaceholder')"
            v-model="form.start_date"
            @update:modelValue="onPlanningParamChange"
            :error="form.errors.get('start_date')"
            :form="form"
            required
          />
        </div>

        <!-- End Date -->
        <div class="col-span-12 md:col-span-4 lg:col-span-3">
          <Input
            id="end_date"
            name="end_date"
            type="date"
            :label="t('actionPlanning.form.endDate')"
            :placeholder="t('actionPlanning.form.endDatePlaceholder')"
            v-model="form.end_date"
            @update:modelValue="onPlanningParamChange"
            :error="form.errors.get('end_date')"
            :form="form"
            required
          />
        </div>

        <!-- Frequency unit -->
        <div class="col-span-12 md:col-span-4 lg:col-span-3">
          <SingleSelect
            id="frequency_unit"
            name="frequency_unit"
            v-model="form.frequency_unit"
            @update:modelValue="onPlanningParamChange"
            :options="actionPlanStore.frequencyUnits"
            :label="t('actionPlanning.form.frequencyUnit')"
            :placeholder="t('actionPlanning.form.frequencyUnitPlaceholder')"
            :error="form.errors.get('frequency_unit')"
            value-key="code"
            label-key="name"
            filterable
            clearable
            required
          />
        </div>

        <!-- Frequency value -->
        <div class="col-span-12 md:col-span-4 lg:col-span-3">
          <Input
            id="frequency_value"
            name="frequency_value"
            type="text"
            :label="t('actionPlanning.form.frequencyValue')"
            :placeholder="t('actionPlanning.form.frequencyValuePlaceholder')"
            v-model="form.frequency_value"
            @update:modelValue="onPlanningParamChange"
            :error="form.errors.get('frequency_value')"
            :form="form"
            required
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Btn to generate -->
  <div class="col-span-12 flex justify-center mt-6">
    <Button
      type="button"
      :icon="Wand2"
      variant="primary"
      customClass="sm:px-4 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="isGenerateDisabled"
      @click="generatePeriods"
    >
      {{ t('actionPlanning.btnGeneratePeriods') }}
    </Button>
  </div>

  <Alert
    v-if="alertStore.hasMessage"
    :type="alertStore.message.type"
    :message="alertStore.message.text"
    @close="alertStore.resetMessage()"
    class="my-4 col-span-12"
  />

  <!-- Planning periods -->
  <div class="col-span-12">
    <table class="min-w-full text-sm bg-white border border-gray-200 table-auto mt-6">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border text-left w-1/3">
            {{ t('actionPlanning.periods.startDate') }}
          </th>
          <th class="p-2 border text-left w-1/3">
            {{ t('actionPlanning.periods.endDate') }}
          </th>
          <th class="p-2 border text-left w-1/6">
            {{ t('actionPlanning.periods.progressPercent') }}
          </th>
          <th class="p-2 border text-center w-[80px]">
            {{ t('common.table.actions') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(period, index) in form.periods"
          :key="period.uuid ?? index"
          class="hover:bg-gray-50"
        >
          <td class="p-2 border truncate">
            <input
              type="date"
              v-model="period.start_date"
              :placeholder="t('actionPlanning.periods.startDate')"
              class="w-full py-2 px-3 rounded-lg text-sm text-gray-800 bg-white border focus:outline-none border-gray-300 focus:border-primary-300 focus:ring-primary-500/10"
            />
          </td>
          <td class="p-2 border truncate">
            <input
              type="date"
              v-model="period.end_date"
              :placeholder="t('actionPlanning.periods.endDate')"
              class="w-full py-2 px-3 rounded-lg text-sm text-gray-800 bg-white border focus:outline-none border-gray-300 focus:border-primary-300 focus:ring-primary-500/10"
            />
          </td>
          <td class="p-2 border">
            <select
              :id="`progress_${index}`"
              :name="`periods.${index}.progress_percent`"
              v-model="period.progress_percent"
              class="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
            >
              >
              <option value="" disabled selected>
                {{ t('actionPlanning.periods.progressPercentPlaceholder') }}
              </option>
              <option v-for="option in progressOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </td>
          <td class="p-2 border text-center">
            <div class="flex justify-center items-center gap-x-4">
              <button
                type="button"
                @click="removePeriod(index)"
                class="text-red-600 hover:text-red-800"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="form.periods.length === 0">
          <td colspan="4" class="text-center py-4 text-gray-500">
            {{ t('actionPlanning.periods.noData') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useActionPlanningStore, useAlertStore } from '@/store';
import { Wand2, Trash2 } from 'lucide-vue-next';
import moment from 'moment';

const actionPlanStore = useActionPlanningStore();
const alertStore = useAlertStore();
const form = actionPlanStore.form;
const { t } = useI18n();

const progressOptions = computed(() => {
  const steps = actionPlanStore.periodProgressValues ?? [];
  return steps.map((v) => ({ value: v, label: `${v}%` }));
});

const isGenerateDisabled = computed(() => {
  return !form.start_date || !form.end_date || !form.frequency_unit || !form.frequency_value;
});

const generatePeriods = async () => {
  form.errors.clear();
  alertStore.resetMessage();

  const { start_date: sd, end_date: ed, frequency_unit: fu, frequency_value: fv } = form;

  if (!moment(sd, 'YYYY-MM-DD', true).isValid()) {
    form.errors.set('start_date', t('actionPlanning.validation.invalidStartDate'));
    return;
  }

  if (!moment(ed, 'YYYY-MM-DD', true).isValid()) {
    form.errors.set('end_date', t('actionPlanning.validation.invalidEndDate'));
    return;
  }

  const startDate = moment(sd, 'YYYY-MM-DD', true);
  const endDate = moment(ed, 'YYYY-MM-DD', true);

  if (endDate.isBefore(startDate)) {
    form.errors.set('end_date', t('actionPlanning.validation.endBeforeStart'));
    return;
  }

  const frequencyValue = parseInt(fv, 10);
  if (isNaN(frequencyValue) || frequencyValue < 1) {
    form.errors.set('frequency_value', t('actionPlanning.validation.invalidFrequency'));
    return;
  }

  const minEndDate = startDate.clone().add(frequencyValue, fu);

  if (endDate.isBefore(minEndDate)) {
    form.errors.set(
      'end_date',
      t('actionPlanning.validation.minDuration', {
        value: frequencyValue,
        unit: t(`actionPlanning.timeUnits.${fu}`),
      })
    );
    return;
  }

  if (endDate.isBefore(minEndDate)) {
    form.errors.set(
      'end_date',
      t('actionPlanning.validation.minDuration', { value: fv, unit: fu })
    );
    return;
  }

  const periods = [];
  let currentStart = startDate.clone();
  const unit = fu;
  const step = frequencyValue;

  while (currentStart.isBefore(endDate)) {
    const nextStart = currentStart.clone().add(step, unit);
    const periodEnd = nextStart.isAfter(endDate) ? endDate.clone() : nextStart;

    if (!periodEnd.isAfter(currentStart)) break;

    periods.push({
      start_date: currentStart.format('YYYY-MM-DD'),
      end_date: periodEnd.format('YYYY-MM-DD'),
      progress_percent: 0,
    });

    currentStart = nextStart;
  }

  form.periods = periods;
};

const removePeriod = (index) => {
  form.periods.splice(index, 1);
};

const onPlanningParamChange = () => {
  if (Array.isArray(form.periods) && form.periods.length) {
    form.periods = [];
  }
};

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'edit',
  },
});
</script>
