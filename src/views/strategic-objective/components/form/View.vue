<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('strategicObjective.sections.statusDetail') }}
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
              editable
              @edit="openStatusModal"
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

    <div class="w-full mx-auto bg-white rounded-lg mt-6">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Structure -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="structure"
              name="structure"
              :label="t('strategicObjective.form.structure')"
              :placeholder="t('strategicObjective.form.structurePlaceholder')"
              :modelValue="form.structure?.name"
            />
          </div>

          <!-- Lead structure -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="lead_structure"
              name="lead_structure"
              :label="t('strategicObjective.form.leadStructure')"
              :placeholder="t('strategicObjective.form.leadStructurePlaceholder')"
              :modelValue="form.lead_structure"
            />
          </div>

          <!-- Structure strategic map -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="strategic_map"
              name="strategic_map"
              :label="t('strategicObjective.form.strategicMap')"
              :placeholder="t('strategicObjective.form.strategicMapPlaceholder')"
              :modelValue="form.strategic_map"
            />
          </div>

          <!-- Strategic Element (Lever or Axis) -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="strategic_element"
              name="strategic_element"
              :label="
                form.structure?.type === 'STATE'
                  ? t('strategicObjective.form.strategicLever')
                  : t('strategicObjective.form.strategicAxis')
              "
              :placeholder="
                form.structure?.type === 'STATE'
                  ? t('strategicObjective.form.strategicLeverPlaceholder')
                  : t('strategicObjective.form.strategicAxisPlaceholder')
              "
              :modelValue="form.strategic_element"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg mt-6">
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
              :label="t('strategicObjective.form.reference')"
              :placeholder="t('strategicObjective.form.reference')"
              :modelValue="form.reference"
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('strategicObjective.form.name')"
              :placeholder="t('strategicObjective.form.namePlaceholder')"
              :modelValue="form.name"
            />
          </div>

          <!-- Start date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="start_date"
              name="start_date"
              :label="t('strategicObjective.form.startDate')"
              :placeholder="t('strategicObjective.form.startDatePlaceholder')"
              :modelValue="form.start_date"
            />
          </div>

          <!-- End date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="end_date"
              name="end_date"
              :label="t('strategicObjective.form.endDate')"
              :placeholder="t('strategicObjective.form.endDatePlaceholder')"
              :modelValue="form.end_date"
            />
          </div>

          <!-- Priority level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="priority"
              name="priority"
              :label="t('strategicObjective.form.priority')"
              :placeholder="t('strategicObjective.form.priorityPlaceholder')"
              :modelValue="form.priority"
            />
          </div>

          <!-- Risk level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="risk_level"
              name="risk_level"
              :label="t('strategicObjective.form.riskLevel')"
              :placeholder="t('strategicObjective.form.riskLevelPlaceholder')"
              :modelValue="form.risk_level"
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
              :label="t('strategicObjective.form.description')"
              :placeholder="t('strategicObjective.form.descriptionPlaceholder')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useStrategicObjectiveStore } from '@/store';
const store = useStrategicObjectiveStore();

const emit = defineEmits(['open-status-modal']);

const openStatusModal = () => {
  emit('open-status-modal', form.id, form.status);
};
const form = store.form;
</script>
  