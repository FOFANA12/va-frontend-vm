<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('strategicAxis.sections.alignmentInfo') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Parent structure -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="parent_structure"
              name="parent_structure"
              :label="t('strategicAxis.form.parentStructure')"
              :placeholder="t('strategicAxis.form.parentStructurePlaceholder')"
              :modelValue="form.parent_structure"
            />
          </div>

          <!-- Parent map -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="parent_map"
              name="parent_map"
              :label="t('strategicAxis.form.parentMap')"
              :placeholder="t('strategicAxis.form.parentMapPlaceholder')"
              :modelValue="form.parent_map"
            />
          </div>

          <!-- Parent element -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="parent_map"
              name="parent_map"
              :label="t('strategicAxis.form.parentElement')"
              :placeholder="t('strategicAxis.form.parentElementPlaceholder')"
              :modelValue="form.parent_element"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg mt-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('strategicAxis.sections.AxisInfo') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Structure -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="structure"
              name="structure"
              :label="t('strategicAxis.form.structure')"
              :placeholder="t('strategicAxis.form.structurePlaceholder')"
              :modelValue="form.structure"
            />
          </div>

          <!-- Strategic map -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="strategic_map"
              name="strategic_map"
              :label="t('strategicAxis.form.strategicMap')"
              :placeholder="t('strategicAxis.form.strategicMapPlaceholder')"
              :modelValue="form.strategic_map"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg mt-1">
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
              :label="t('strategicAxis.form.reference')"
              :placeholder="t('strategicAxis.form.reference')"
              :modelValue="form.reference"
            />
          </div>

          <!-- Order -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="order"
              name="order"
              :label="t('strategicAxis.form.order')"
              :placeholder="t('strategicAxis.form.orderPlaceholder')"
              :modelValue="form.order"
            />
          </div>

          <!-- Abbreviation -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="abbreviation"
              name="abbreviation"
              :label="t('strategicAxis.form.abbreviation')"
              :placeholder="t('strategicAxis.form.abbreviationPlaceholder')"
              :modelValue="form.abbreviation"
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('strategicAxis.form.name')"
              :placeholder="t('strategicAxis.form.namePlaceholder')"
              :modelValue="form.name"
            />
          </div>

          <!-- Status -->
          <div class="col-span-12 md:col-span-4 flex items-center">
            <input
              id="status"
              type="checkbox"
              v-model="form.status"
              class="checkbox-primary h-5 w-5 mr-2"
              disabled
            />
            <label for="status" class="text-gray-700">
              {{ t('common.form.status') }}
            </label>
          </div>

          <!-- Description -->
          <div class="col-span-12">
            <TextareaReadonly
              id="description"
              name="description"
              v-model="form.description"
              :label="t('strategicAxis.form.description')"
              :placeholder="t('strategicAxis.form.descriptionPlaceholder')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useStrategicAxisStore } from '@/store';
const store = useStrategicAxisStore();

const form = store.form;
</script>
  