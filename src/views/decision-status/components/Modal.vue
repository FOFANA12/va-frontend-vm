<template>
  <CustomModal size="lg" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="grid grid-cols-12 gap-6">
          <!-- Status Date -->
          <div class="col-span-12 md:col-span-6" v-if="isReadOnly">
            <InputReadonly
              id="status_date"
              name="status_date"
              :label="t('decisionStatus.form.statusDate')"
              :placeholder="t('decisionStatus.form.statusDatePlaceholder')"
              :modelValue="form.status_date"
              readonly
            />
          </div>

          <!-- Status -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="status"
              name="status"
              :label="t('decisionStatus.form.status')"
              :placeholder="t('decisionStatus.form.statusPlaceholder')"
              :modelValue="form.status?.label"
              readonly
            />
            <SingleSelect
              v-else
              id="status"
              name="status"
              v-model="form.status"
              :options="requirements.statuses"
              :label="t('decisionStatus.form.status')"
              :placeholder="t('decisionStatus.form.statusPlaceholder')"
              :error="form.errors.get('status')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="code"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>

          <!-- Attachment (File Upload) -->
          <div class="col-span-12">
            <label for="file" class="mb-1 block text-sm font-medium text-gray-700">
              {{ t('attachment.form.file') }}
            </label>

            <div
              v-if="isReadOnly && form.attachment && form.attachment.download_url && !form.file"
              class="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
            >
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

            <div v-else>
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
                    v-if="form.file"
                    type="button"
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
          </div>

          <!-- Comment -->
          <div class="col-span-12">
            <TextareaReadonly
              v-if="isReadOnly"
              id="comment"
              name="comment"
              :label="t('decisionStatus.form.comment')"
              :placeholder="t('decisionStatus.form.commentPlaceholder')"
              :modelValue="form.comment"
              :rows="6"
            />
            <Textarea
              v-else
              id="comment"
              name="comment"
              v-model="form.comment"
              :label="t('decisionStatus.form.comment')"
              :placeholder="t('decisionStatus.form.commentPlaceholder')"
              :error="form.errors.get('comment')"
              :rows="6"
              required
            />
          </div>
        </div>
      </form>
    </template>

    <template #buttons>
      <div class="flex gap-4 items-center">
        <Button
          v-if="!isReadOnly"
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded-lg hover:bg-gray-400 transition-all flex justify-center"
          @click="closeModal"
        >
          {{ t('common.modal.buttons.cancel') }}
        </Button>

        <Button
          v-if="!isReadOnly"
          variant="primary"
          customClass="min-w-[100px] bg-primary-500 text-white px-3 rounded-lg hover:bg-primary-600 transition-all flex justify-center"
          @click="onSubmit"
          type="submit"
        >
          {{
            context === 'create' ? t('common.modal.buttons.create') : t('common.modal.buttons.save')
          }}
        </Button>

        <Button
          v-else
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded hover:bg-gray-400 transition-all flex justify-center"
          @click="closeModal"
        >
          {{ t('common.modal.buttons.close') }}
        </Button>
      </div>
    </template>
  </CustomModal>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useDecisionStatusStore } from '@/store';
const store = useDecisionStatusStore();
const { t } = useI18n();
const emit = defineEmits(['success']);
import dayjs from 'dayjs';
import { FileText } from 'lucide-vue-next';

const form = store.form;
const isModalOpen = ref(false);
const context = ref('create');
const isReadOnly = computed(() => context.value === 'view');
const decisionId = ref(null);
const requirements = ref({ statuses: [] });
const fileInput = ref(null);

const modalTitle = computed(() => {
  switch (context.value) {
    case 'create':
      return t('decisionStatus.modalTitleCreation');
    case 'view':
    default:
      return t('decisionStatus.modalTitleOverview');
  }
});

const triggerFileSelection = () => fileInput.value.click();

const onChangeFile = (event) => {
  form.file = event.target.files[0];
  form.delete_file = false;
};

const clearFile = () => {
  form.file = null;
  form.attachment = null;
  form.delete_file = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const onSubmit = async () => {
  closeModal();
  try {
    const result =
      context.value === 'create'
        ? await store.create(decisionId.value)
        : await store.update(form.id);

    onSuccess(result);
  } catch (error) {
    onError(error);
  }
};

const onSuccess = (result) => {
  store.resetForm();
  closeModal();
  emit('success', result);
};

const onError = (error) => {
  console.error('Error submitting form:', error);
  isModalOpen.value = true;
};

const loadRequirements = async (id) => {
  try {
    const result = await store.requirements(id);
    requirements.value = result;
  } catch (err) {
    console.error('Error loading requirements:', err);
  }
};

const openCreateModal = async (id) => {
  context.value = 'create';
  store.resetForm();
  decisionId.value = id;
  form.status_date = dayjs().format('YYYY-MM-DD');
  await loadRequirements(id);
  isModalOpen.value = true;
};

const openViewModal = async (id) => {
  context.value = 'view';
  store.resetForm();
  try {
    await store.find(id);
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open view modal:', err);
  }
};

defineExpose({ openCreateModal, openViewModal });
</script>
