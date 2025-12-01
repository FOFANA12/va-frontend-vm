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
          <!-- Control Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="control_date"
              name="control_date"
              v-model="form.control_date"
              :label="t('actionControl.form.controlDate')"
              :placeholder="t('actionControl.form.controlDatePlaceholder')"
              :error="form.errors.get('control_date')"
              required
            />
          </div>

          <!-- Period -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="action_period"
              name="action_period"
              :label="t('actionControl.form.actionPeriod')"
              :placeholder="t('actionControl.form.actionPeriodPlaceholder')"
              :modelValue="period?.label"
            />
          </div>

          <!-- File Upload -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <label for="file" class="mb-1 block text-sm font-medium text-gray-700">
              {{ t('attachment.form.file') }}
            </label>

            <div class="relative">
              <input
                id="file"
                ref="fileInput"
                type="file"
                class="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                @change="onChangeFile"
              />

              <div
                class="w-full py-2.5 px-3 rounded-lg text-sm text-gray-800 bg-white border cursor-pointer flex items-center justify-between border-gray-300 focus-within:border-primary-300 focus-within:ring-1 focus-within:ring-primary-500/10"
                @click="triggerFileSelection"
              >
                <span class="truncate text-gray-500">
                  {{ form.file ? form.file.name : t('attachment.form.filePlaceholder') }}
                </span>

                <Upload v-if="!form.file" class="w-5 h-5 text-gray-400" />

                <button
                  type="button"
                  v-if="form.file"
                  @click.prevent.stop="clearFile"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>
            </div>

            <p v-if="form.errors.get('file')" class="text-red-500 text-xs mt-1">
              {{ form.errors.get('file') }}
            </p>
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

            <td class="p-2 border text-right">{{ phase.weight }}</td>

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
import { Upload, X } from 'lucide-vue-next';

const actionControlStore = useActionControlStore();
const alertStore = useAlertStore();

const form = actionControlStore.form;
const fileInput = ref(null);

const triggerFileSelection = () => {
  fileInput.value.click();
};

const onChangeFile = (event) => {
  form.file = event.target.files[0];
  form.delete_file = false;
};

const clearFile = () => {
  form.file = null;
  form.attachment = null;
  form.delete_file = true;
};

const progressOptions = computed(() => {
  const steps = actionControlStore.progressValues ?? [];
  return steps.map((v) => ({ value: v, label: `${v}%` }));
});

const period = computed(() => {
  return actionControlStore.period;
});

const forecastPercent = computed(() => {
  return period.value ? Number(period.value.progress_percent ?? 0).toFixed(2) : 0;
});

const actualProgressPercent = computed(() => {
  return actionControlStore.phases
    .reduce((sum, p) => {
      return sum + Number(p.weight) * Number(p.progress_percent ?? 0);
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
