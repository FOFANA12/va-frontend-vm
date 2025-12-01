<template>
  <div
    v-if="form.attachment && form.attachment.download_url && !form.file"
    class="w-full mx-auto bg-white rounded-lg mb-2"
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
        <!-- Contract number -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <Input
            id="contract_number"
            name="contract_number"
            :label="t('contract.form.contractNumber')"
            :placeholder="t('contract.form.contractNumberPlaceholder')"
            v-model="form.contract_number"
            :error="form.errors.get('contract_number')"
            :form="form"
            required
          />
        </div>

        <!-- Title -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <Input
            id="title"
            name="title"
            :label="t('contract.form.title')"
            :placeholder="t('contract.form.titlePlaceholder')"
            v-model="form.title"
            :error="form.errors.get('title')"
            :form="form"
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

        <!-- Signed At -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <Input
            id="signed_at"
            name="signed_at"
            type="date"
            :label="t('contract.form.signedAt')"
            :placeholder="t('contract.form.signedAtPlaceholder')"
            v-model="form.signed_at"
            :error="form.errors.get('signed_at')"
            :form="form"
          />
        </div>

        <!-- Start Date -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <Input
            id="start_date"
            name="start_date"
            type="date"
            :label="t('contract.form.startDate')"
            :placeholder="t('contract.form.startDatePlaceholder')"
            v-model="form.start_date"
            :error="form.errors.get('start_date')"
            :form="form"
          />
        </div>

        <!-- End Date -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <Input
            id="end_date"
            name="end_date"
            type="date"
            :label="t('contract.form.endDate')"
            :placeholder="t('contract.form.endDatePlaceholder')"
            v-model="form.end_date"
            :error="form.errors.get('end_date')"
            :form="form"
          />
        </div>

        <!-- Amount -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <Input
            id="amount"
            name="amount"
            :label="
              currencyStore.defaultCurrency?.code
                ? `${t('contract.form.amount')} (${currencyStore.defaultCurrency.code})`
                : t('contract.form.amount')
            "
            :placeholder="t('contract.form.amountPlaceholder')"
            v-model="form.amount"
            :error="form.errors.get('amount')"
            :form="form"
          />
        </div>

        <!-- Status -->
        <div class="col-span-12 md:col-span-6 flex items-center">
          <input
            id="status"
            type="checkbox"
            v-model="form.status"
            class="checkbox-primary h-5 w-5 mr-2"
          />
          <label for="status" class="text-gray-700">
            {{ t('common.form.status') }}
          </label>
        </div>

        <!-- Description -->
        <div class="grid grid-cols-12 md:col-span-12 gap-4 mt-4">
          <div class="col-span-12">
            <Textarea
              id="description"
              name="description"
              v-model="form.description"
              :label="t('contract.form.description')"
              :placeholder="t('contract.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :form="form"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContractStore, useSettingsCurrencyStore } from '@/store';
import { FileText, Upload, X } from 'lucide-vue-next';

const contractStore = useContractStore();
const currencyStore = useSettingsCurrencyStore();

const form = contractStore.form;
const route = useRoute();

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const fileInput = ref(null);

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
</script>
