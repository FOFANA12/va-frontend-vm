<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white shadow-sm rounded-lg">
      <div class="card-header">
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Start date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="start_date"
              name="start_date"
              :label="t('structureMatrixPeriod.form.startDate')"
              :placeholder="t('structureMatrixPeriod.form.startDatePlaceholder')"
              :modelValue="form.start_date"
            />
          </div>

          <!-- End date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="end_date"
              name="end_date"
              :label="t('structureMatrixPeriod.form.endDate')"
              :placeholder="t('structureMatrixPeriod.form.endDatePlaceholder')"
              :modelValue="form.end_date"
            />
          </div>

          <!-- Structure strategic map -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="strategic_map"
              name="strategic_map"
              :label="t('structureMatrixPeriod.form.strategicMap')"
              :placeholder="t('structureMatrixPeriod.form.strategicMapPlaceholder')"
              :modelValue="form.strategic_map"
            />
          </div>

          <!-- Structure strategic objective(s) -->
          <div class="col-span-12 md:col-span-12 lg:col-span-12">
            <div class="card-header mb-2">
              <h3>{{ t('structureMatrixPeriod.form.strategicObjective') }}</h3>
              <hr class="border-t border-gray-200 w-full mb-0" />
            </div>
            <h3 class="border  rounded-lg text-gray-500  font-semibold p-3 text-center"
              v-if="!form.strategic_objectives || form.strategic_objectives?.length === 0"
            >
              {{ t('structureMatrixPeriod.form.noStrategicObjective') }}
            </h3>
            <span
              v-else
              v-for="strategicObjective in form.strategic_objectives"
              :key="strategicObjective"
              class="rounded-lg m-1 bg-green-300 text-green-900 px-3 py-1 inline-block"
            >
              {{ strategicObjective.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useStructureMatrixPeriodStore } from '@/store';
const store = useStructureMatrixPeriodStore();
const form = store.form;
</script>
  