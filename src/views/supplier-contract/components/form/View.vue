<template>
  <div class="w-full mx-auto bg-white rounded-lg">
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4">
        <!-- Contract number -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="contract_number"
            name="contract_number"
            :label="t('contract.form.contractNumber')"
            :placeholder="t('contract.form.contractNumberPlaceholder')"
            :modelValue="form.contract_number"
          />
        </div>

        <!-- Title -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="title"
            name="title"
            :label="t('contract.form.title')"
            :placeholder="t('contract.form.titlePlaceholder')"
            :modelValue="form.title"
          />
        </div>

          <div v-if="form.attachment && form.attachment.download_url && !form.file"
          class="col-span-12 md:col-span-6 lg:col-span-4">
            <label class="mb-2 block text-sm font-medium text-gray-700">
              {{ t('attachment.form.attachedFile') }}
            </label>

            <div class="flex items-center p-3 border rounded-lg bg-gray-50">
              <div class="flex items-center gap-2">
                <FileText class="w-5 h-5 text-primary-500" />
                <a
                  :href="form.attachment.download_url"
                  target="_blank"
                  class=" text-primary-600 hover:underline max-w-[300px] truncate"
                >
                  {{ form.attachment.original_name }}
                </a>
              </div>
            </div>
        </div>

        <!-- Signed At -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="signed_at"
            name="signed_at"
            :label="t('contract.form.signedAt')"
            :placeholder="t('contract.form.signedAtPlaceholder')"
            :modelValue="form.signed_at"
          />
        </div>

        <!-- Start Date -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="start_date"
            name="start_date"
            :label="t('contract.form.startDate')"
            :placeholder="t('contract.form.startDatePlaceholder')"
            :modelValue="form.start_date"
          />
        </div>

        <!-- End Date -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="end_date"
            name="end_date"
            :label="t('contract.form.endDate')"
            :placeholder="t('contract.form.endDatePlaceholder')"
            :modelValue="form.end_date"
          />
        </div>

        <!-- Amount -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="amount"
            name="amount"
            :label="t('contract.form.amount')"
            :placeholder="t('contract.form.amountPlaceholder')"
            :modelValue="formatCurrency(form.amount, currencyStore.defaultCurrency.code)"
          />
        </div>

        <!-- Status -->
        <div class="col-span-12 md:col-span-6 flex items-center">
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
        <div class="grid grid-cols-12 md:col-span-12 gap-4 mt-4">
          <div class="col-span-12">
            <TextareaReadonly
              id="description"
              name="description"
              :label="t('contract.form.description')"
              :placeholder="t('contract.form.descriptionPlaceholder')"
              :modelValue="form.description"
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
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import { FileText } from 'lucide-vue-next';
const { formatCurrency } = useCurrencyFormatter();

const contractStore = useContractStore();
const currencyStore = useSettingsCurrencyStore();

const form = contractStore.form;
</script>
