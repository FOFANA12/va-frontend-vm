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
            <Input
              id="start_date"
              name="start_date"
              :label="t('structureMatrixPeriod.form.startDate')"
              v-model="form.start_date"
              :placeholder="t('structureMatrixPeriod.form.startDatePlaceholder')"
              :error="form.errors.get('start_date')"
              type="date"
              :form="form"
              required
            />
          </div>
          <!-- End date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="end_date"
              name="end_date"
              :label="t('structureMatrixPeriod.form.endDate')"
              v-model="form.end_date"
              :placeholder="t('structureMatrixPeriod.form.endDatePlaceholder')"
              :error="form.errors.get('end_date')"
              type="date"
              :form="form"
              required
            />
          </div>

          <!-- Structure strategic map -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="strategic_map"
              name="strategic_map"
              v-model="form.strategic_map"
              :label="t('structureMatrixPeriod.form.strategicMap')"
              :options="store.strategicMaps"
              :placeholder="t('structureMatrixPeriod.form.strategicMapPlaceholder')"
              :error="form.errors.get('strategic_map')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>

          <!-- Structure strategic objective(s) -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <MultiSelect
              id="strategic_objective"
              name="strategic_objective"
              v-model="form.strategic_objectives"
              :label="t('structureMatrixPeriod.form.strategicObjective')"
              :options="store.strategicObjectives"
              :placeholder="t('structureMatrixPeriod.form.strategicObjectivePlaceholder')"
              :error="form.errors.get('strategic_objectives')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useStructureMatrixPeriodStore } from '@/store';
import { Eye, EyeOff } from 'lucide-vue-next';

const store = useStructureMatrixPeriodStore();


const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});


const form = store.form;
</script>
  