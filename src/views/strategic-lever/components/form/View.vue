<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg mt-6">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Structure -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="structure"
              name="structure"
              :label="t('strategicLever.form.structure')"
              :placeholder="t('strategicLever.form.structurePlaceholder')"
              :modelValue="form.structure"
            />
          </div>

          <!-- Strategic map -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="strategic_map"
              name="strategic_map"
              :label="t('strategicLever.form.strategicMap')"
              :placeholder="t('strategicLever.form.strategicMapPlaceholder')"
              :modelValue="form.strategic_map"
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

          <!-- Order -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="order"
              name="order"
              :label="t('strategicLever.form.order')"
              :placeholder="t('strategicLever.form.orderPlaceholder')"
              :modelValue="form.order"
            />
          </div>

          <!-- Abbreviation -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="abbreviation"
              name="abbreviation"
              :label="t('strategicLever.form.abbreviation')"
              :placeholder="t('strategicLever.form.abbreviationPlaceholder')"
              :modelValue="form.abbreviation"
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('strategicLever.form.name')"
              :placeholder="t('strategicLever.form.namePlaceholder')"
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
              :label="t('strategicLever.form.description')"
              :placeholder="t('strategicLever.form.descriptionPlaceholder')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useStrategicLeverStore } from '@/store';
const store = useStrategicLeverStore();

const form = store.form;
</script>
  