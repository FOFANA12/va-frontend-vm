<template>
  <div class="w-full mx-auto bg-white rounded-lg my-6">
    <div class="card-header">
      <h2 class="text-xl p-4 pt-2 pb-2">
        {{ t('decision.sections.statusDetail') }}
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

        <!-- Decision Date -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="decision_date"
            name="decision_date"
            :label="t('decision.form.decisionDate')"
            :placeholder="t('decision.form.decisionDatePlaceholder')"
            :modelValue="form.decision_date"
          />
        </div>

        <!-- Title -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="title"
            name="title"
            :label="t('decision.form.title')"
            :placeholder="t('decision.form.titlePlaceholder')"
            :modelValue="form.title"
          />
        </div>

        <!-- Priority -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="title"
            name="title"
            :label="t('decision.form.priority')"
            :placeholder="t('decision.form.priorityPlaceholder')"
            :modelValue="form.priority?.label"
          />
        </div>

        <!-- Description -->
        <div class="col-span-12">
          <TextareaReadonly
            id="description"
            name="description"
            v-model="form.description"
            :label="t('decision.form.description')"
            :placeholder="t('decision.form.descriptionPlaceholder')"
            :rows="8"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDecisionStore } from '@/store';
const decisionStore = useDecisionStore();
import { FileText } from 'lucide-vue-next'
const form = decisionStore.form;
</script>
