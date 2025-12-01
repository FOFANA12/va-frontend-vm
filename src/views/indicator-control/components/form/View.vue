<template>
  <div
    v-if="form.attachment && form.attachment.download_url && !form.file"
    class="w-full mx-auto bg-white rounded-lg mb-6"
  >
    <div class="p-4">
      <label class="mb-2 block text-sm font-medium text-gray-700">
        {{ t('attachment.form.attachedFile') }}
      </label>

      <div class="flex items-center p-3 border rounded-lg bg-gray-50">
        <div class="flex items-center gap-2">
          <FileText class="w-5 h-5 text-primary-500" />
          <a
            :href="form.attachment.download_url"
            target="_blank"
            class="text-primary-600 hover:underline truncate max-w-[500px]"
          >
            {{ form.attachment.original_name }}
          </a>
        </div>
      </div>
    </div>
  </div>

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
            :label="t('indicatorControl.form.controlDate')"
            :placeholder="t('indicatorControl.form.controlDatePlaceholder')"
            :modelValue="form.control_date"
          />
        </div>

        <!-- Period -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="indicator_period"
            name="indicator_period"
            :label="t('indicatorControl.form.indicatorPeriod')"
            :placeholder="t('indicatorControl.form.indicatorPeriodPlaceholder')"
            :modelValue="form.indicator_period"
          />
        </div>

        <!-- Target value -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="target_value"
            name="target_value"
            :label="t('indicatorControl.form.targetValue')"
            :placeholder="t('indicatorControl.form.targetValuePlaceholder')"
            :modelValue="form.target_value"
          />
        </div>

        <!-- Achieved value -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="achieved_value"
            name="achieved_value"
            :label="t('indicatorControl.form.achievedValue')"
            :placeholder="t('indicatorControl.form.achievedValuePlaceholder')"
            :modelValue="form.achieved_value"
          />
        </div>

        <!-- Root cause -->
        <div class="col-span-12">
          <TextareaReadonly
            id="root_cause"
            name="root_cause"
            v-model="form.root_cause"
            :label="t('indicatorControl.form.rootCause')"
            :placeholder="t('indicatorControl.form.rootCausePlaceholder')"
            :rows="8"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useIndicatorControlStore } from '@/store';
import { FileText } from 'lucide-vue-next';

const indicatorControlStore = useIndicatorControlStore();

const form = indicatorControlStore.form;
</script>
