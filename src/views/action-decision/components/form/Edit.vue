<template>
  <div class="w-full mx-auto bg-white rounded-lg my-6" v-if="context !== 'create'">
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

  <Alert
    v-if="alertStore.hasMessage"
    :type="alertStore.message.type"
    :message="alertStore.message.text"
    @close="alertStore.resetMessage()"
    class="my-4 col-span-12"
  />

  <div
    v-if="form.attachment && form.attachment.download_url && !form.file"
    class="w-full mx-auto bg-white rounded-lg mb-6"
  >
    <div class="p-4">
      <label class="mb-2 block text-sm font-medium text-gray-700">
        {{ t('attachment.form.attachedFile') }}
      </label>

      <div class="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
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
        <button
          type="button"
          @click.prevent.stop="clearFile"
          class="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>

  <div class="w-full mx-auto bg-white rounded-lg">
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4">
        <!-- Author -->
        <div
          class="col-span-12 md:col-span-6 lg:col-span-4"
          v-if="context === 'edit' && form.author"
        >
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
          <DatePicker
            id="decision_date"
            name="decision_date"
            v-model="form.decision_date"
            :label="t('decision.form.decisionDate')"
            :placeholder="t('decision.form.decisionDatePlaceholder')"
            :error="form.errors.get('decision_date')"
            required
          />
        </div>

        <!-- Title -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <Input
            id="title"
            name="title"
            type="text"
            :label="t('decision.form.title')"
            :placeholder="t('decision.form.titlePlaceholder')"
            v-model="form.title"
            :error="form.errors.get('title')"
            :form="form"
            required
          />
        </div>

        <!-- Priority -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <SingleSelect
            id="priority"
            name="priority"
            v-model="form.priority"
            :options="decisionStore.priorityLevels"
            :label="t('decision.form.priority')"
            :placeholder="t('decision.form.priorityPlaceholder')"
            :error="form.errors.get('priority')"
            value-key="code"
            label-key="name"
            filterable
            clearable
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

        <!-- Description -->
        <div class="col-span-12">
          <Textarea
            id="description"
            name="description"
            v-model="form.description"
            :label="t('decision.form.description')"
            :placeholder="t('decision.form.descriptionPlaceholder')"
            :error="form.errors.get('description')"
            :rows="8"
            required
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDecisionStore, useAlertStore } from '@/store';
import dayjs from 'dayjs';
import { FileText, Upload, X } from 'lucide-vue-next';

const decisionStore = useDecisionStore();
const alertStore = useAlertStore();

const form = decisionStore.form;
const fileInput = ref(null);

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

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

onMounted(() => {
  if (props.context === 'create' && !form.decision_date) {
    if (!form.decision_date) {
      form.decision_date = dayjs().format('YYYY-MM-DD');
    }
  }
});
</script>
