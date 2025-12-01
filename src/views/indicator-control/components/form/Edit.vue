<template>
  <div
    class="w-full mx-auto bg-white rounded-lg"
    v-if="!indicatorControlStore.indicator?.is_planned"
  >
    <div class="card-body p-4">
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <p class="text-lg text-red-600">
          {{ t('indicatorControl.noPlanningYet') }}
        </p>
      </div>
    </div>
  </div>
  <div
    class="w-full mx-auto bg-white rounded-lg"
    v-else-if="!indicatorControlStore.indicator?.is_in_progress"
  >
    <div class="card-body p-4">
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <p class="text-lg text-red-600">
          {{ t('indicatorControl.notInProgress') }}
        </p>
      </div>
    </div>
  </div>

  <template v-if="indicatorControlStore.indicator?.can_control">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Control Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="control_date"
              name="control_date"
              v-model="form.control_date"
              :label="t('indicatorControl.form.controlDate')"
              :placeholder="t('indicatorControl.form.controlDatePlaceholder')"
              :error="form.errors.get('control_date')"
              required
            />
          </div>

          <!-- Indicator period -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="action_period"
              name="action_period"
              :label="t('actionControl.form.actionPeriod')"
              :placeholder="t('actionControl.form.actionPeriodPlaceholder')"
              :modelValue="period?.label"
            />
          </div>
          <!-- target_value -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="target_value"
              name="target_value"
              :label="t('indicatorControl.form.targetValue')"
              :placeholder="t('indicatorControl.form.targetValuePlaceholder')"
              :modelValue="form.target_value"
            />
          </div>

          <!-- achieved_value -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="achieved_value"
              name="achieved_value"
              :label="t('indicatorControl.form.achievedValue')"
              :placeholder="t('indicatorControl.form.achievedValuePlaceholder')"
              v-model="form.achieved_value"
              :error="form.errors.get('achieved_value')"
              :form="form"
              required
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
          <div class="col-span-12">
            <Textarea
              id="root_cause"
              name="root_cause"
              v-model="form.root_cause"
              :label="t('indicatorControl.form.rootCause')"
              :placeholder="t('indicatorControl.form.rootCausePlaceholder')"
              :error="form.errors.get('root_cause')"
              :rows="8"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { useIndicatorControlStore } from '@/store';
import { Upload, X } from 'lucide-vue-next';

const indicatorControlStore = useIndicatorControlStore();

const form = indicatorControlStore.form;
const fileInput = ref(null);
const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const period = computed(() => {
  return indicatorControlStore.period;
});
form.achieved_value = period.value.target_value;
form.target_value = period.value.target_value;
form.indicator_period = period.value.uuid;

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
</script>
