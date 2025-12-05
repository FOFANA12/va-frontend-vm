<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('indicator.sections.statusDetail') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Status -->
          <div class="col-span-12 md:col-span-4">
            <StatusField
              :status="form.status"
              :label="t('common.form.status')"
              :placeholder="t('common.form.status')"
              display-key="label"
            />
          </div>

          <!-- Status Changed At -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="status_changed_at"
              name="status_changed_at"
              :label="t('common.form.statusChangedAt')"
              :model-value="form?.status_changed_at || '-'"
            />
          </div>

          <!-- Status Changed By -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="status_changed_by"
              name="status_changed_by"
              :label="t('common.form.statusChangedBy')"
              :model-value="form.status_changed_by || '-'"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-body p-4">
        <div class="flex flex-col gap-6">
          <!-- Strategic map -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="strategic_map"
              name="strategic_map"
              :label="t('indicator.form.strategicMap')"
              :placeholder="t('indicator.form.strategicMapPlaceholder')"
              :modelValue="form.strategic_map"
            />
          </div>

          <!-- Strategic Element (Lever or Axis) -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="strategic_element"
              name="strategic_element"
              :label="
                form.structure?.type === 'STATE'
                  ? t('indicator.form.strategicLever')
                  : t('indicator.form.strategicAxis')
              "
              :placeholder="
                form.structure?.type === 'STATE'
                  ? t('indicator.form.strategicLeverPlaceholder')
                  : t('indicator.form.strategicAxisPlaceholder')
              "
              :modelValue="form.strategic_element"
            />
          </div>

          <!-- Strategic objective -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="strategic_objective"
              name="strategic_objective"
              :label="t('indicator.form.strategicObjective')"
              :placeholder="t('indicator.form.strategicObjectivePlaceholder')"
              :modelValue="form.strategic_objective"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Auteur -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="form.author">
            <InputReadonly
              id="author"
              name="author"
              :label="t('common.form.author')"
              :placeholder="t('common.form.author')"
              :model-value="form.author"
            />
          </div>

          <!-- Reference -->
          <div v-if="form.reference" class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('indicator.form.reference')"
              :placeholder="t('indicator.form.reference')"
              :modelValue="form.reference"
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('indicator.form.name')"
              :placeholder="t('indicator.form.namePlaceholder')"
              :modelValue="form.name"
            />
          </div>

          <!-- Initial value -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="initial_value"
              name="initial_value"
              :label="t('indicator.form.initialValue')"
              :placeholder="t('indicator.form.initialValuePlaceholder')"
              :modelValue="form.initial_value"
            />
          </div>

          <!-- Final target value -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="final_target_value"
              name="final_target_value"
              :label="t('indicator.form.finalTargetValue')"
              :placeholder="t('indicator.form.finalTargetValuePlaceholder')"
              :modelValue="form.final_target_value"
            />
          </div>

          <!-- Achieved value -->
          <!-- <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="achieved_value"
              name="achieved_value"
              :label="t('indicator.form.achievedValue')"
              :modelValue="form.achieved_value"
              :placeholder="t('indicator.form.achievedValuePlaceholder')"
            />
          </div> -->

          <!-- Unit -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="unit"
              name="unit"
              :label="t('indicator.form.unit')"
              :placeholder="t('indicator.form.unitPlaceholder')"
              :modelValue="form.unit"
            />
          </div>

          <!-- Category -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="category"
              name="category"
              :label="t('indicator.form.category')"
              :placeholder="t('indicator.form.categoryPlaceholder')"
              :modelValue="form.category"
            />
          </div>

          <!-- Charte type -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="chart_type"
              name="chart_type"
              :label="t('indicator.form.chartType')"
              :placeholder="t('indicator.form.chartTypePlaceholder')"
              :modelValue="form.chart_type"
            />
          </div>

          <!-- State -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <StatusField
              :status="form.state"
              :label="t('common.form.state')"
              :placeholder="t('common.form.state')"
              display-key="label"
            />
          </div>

          <!-- Description -->
          <div class="col-span-12">
            <TextareaReadonly
              id="description"
              name="description"
              v-model="form.description"
              :label="t('indicator.form.description')"
              :placeholder="t('indicator.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useIndicatorStore } from '@/store';

const store = useIndicatorStore();

const form = store.form;
</script>
  