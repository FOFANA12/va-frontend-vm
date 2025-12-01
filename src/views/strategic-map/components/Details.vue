<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
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

          <!-- Structure -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="structure"
              name="structure"
              :label="t('strategicMap.form.structure')"
              :placeholder="t('strategicMap.form.structurePlaceholder')"
              :modelValue="form.structure?.name"
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('strategicMap.form.name')"
              :placeholder="t('strategicMap.form.namePlaceholder')"
              :modelValue="form.name"
            />
          </div>

          <!-- Start Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="start_date"
              name="start_date"
              :label="t('strategicMap.form.startDate')"
              :placeholder="t('strategicMap.form.startDatePlaceholder')"
              :modelValue="form.start_date"
            />
          </div>

          <!-- End Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="end_date"
              name="end_date"
              :label="t('strategicMap.form.endDate')"
              :placeholder="t('strategicMap.form.endDatePlaceholder')"
              :modelValue="form.end_date"
            />
          </div>

          <!-- Description -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <TextareaReadonly
              id="description"
              name="description"
              v-model="form.description"
              :label="t('strategicMap.form.description')"
              :placeholder="t('strategicMap.form.descriptionPlaceholder')"
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
import { useStrategicMapStore } from '@/store';

const store = useStrategicMapStore();
const form = store.form;
</script>
  