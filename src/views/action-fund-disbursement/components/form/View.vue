<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('actionFundDisbursement.sections.generalInfo') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Reference -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('actionFundDisbursement.form.reference')"
              :placeholder="t('actionFundDisbursement.form.reference')"
              :model-value="form.reference"
            />
          </div>

          <!-- Action -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="action"
              name="action"
              :label="t('actionFundDisbursement.form.action')"
              :placeholder="t('actionFundDisbursement.form.actionPlaceholder')"
              :model-value="form.action?.reference"
            />
          </div>

          <!-- Phase -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="phase"
              name="phase"
              :label="t('actionFundDisbursement.form.phase')"
              :placeholder="t('actionFundDisbursement.form.phasePlaceholder')"
              :modelValue="form.phase"
            />
          </div>

          <!-- Task -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="task"
              name="task"
              :label="t('actionFundDisbursement.form.task')"
              :placeholder="t('actionFundDisbursement.form.taskPlaceholder')"
              :modelValue="form.task"
            />
          </div>

          <!-- Budget type -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="budget_type"
              name="budget_type"
              :label="t('actionFundDisbursement.form.budgetType')"
              :placeholder="t('actionFundDisbursement.form.budgetTypePlaceholder')"
              :modelValue="form.budget_type"
            />
          </div>

          <!-- Description -->
          <div class="col-span-12">
            <TextareaReadonly
              id="description"
              name="description"
              v-model="form.description"
              :label="t('actionFundDisbursement.form.description')"
              :placeholder="t('actionFundDisbursement.form.descriptionPlaceholder')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto mt-6 bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('actionFundDisbursement.sections.contractAdminInfo') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Supplier -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="supplier"
              name="supplier"
              :label="t('actionFundDisbursement.form.supplier')"
              :placeholder="t('actionFundDisbursement.form.supplierPlaceholder')"
              :modelValue="form.supplier"
            />
          </div>

          <!-- Contract number -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="contract"
              name="contract"
              :label="t('actionFundDisbursement.form.contract')"
              :placeholder="t('actionFundDisbursement.form.contractPlaceholder')"
              :modelValue="form.contract"
            />
          </div>

          <!-- Operation number -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="operation_number"
              name="operation_number"
              :label="t('actionFundDisbursement.form.operationNumber')"
              :placeholder="t('actionFundDisbursement.form.operationNumberPlaceholder')"
              :modelValue="form.operation_number"
            />
          </div>

          <!-- Signature date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="signature_date"
              name="signature_date"
              :label="t('actionFundDisbursement.form.signatureDate')"
              :placeholder="t('actionFundDisbursement.form.signatureDatePlaceholder')"
              :modelValue="form.signature_date"
            />
          </div>

          <!-- Execution date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="execution_date"
              name="execution_date"
              :label="t('actionFundDisbursement.form.executionDate')"
              :placeholder="t('actionFundDisbursement.form.executionDatePlaceholder')"
              :modelValue="form.execution_date"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="form.attachment && form.attachment.download_url && !form.file"
      class="w-full mx-auto bg-white rounded-lg mb-6 mt-6"
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

    <div class="w-full mx-auto mt-6 bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('actionFundDisbursement.sections.paymentInfo') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Payment mode -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="payment_mode"
              name="payment_mode"
              :label="t('actionFundDisbursement.form.paymentMode')"
              :placeholder="t('actionFundDisbursement.form.paymentModePlaceholder')"
              :modelValue="form.payment_mode"
            />
          </div>

          <!-- Payment amount -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="payment_amount"
              name="payment_amount"
              :label="t('actionFundDisbursement.form.paymentAmount')"
              :placeholder="t('actionFundDisbursement.form.paymentAmountPlaceholder')"
              :modelValue="formatAmount(form.payment_amount, actionCurrencyCode)"
            />
          </div>

          <!-- Payment date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="payment_date"
              name="payment_date"
              :label="t('actionFundDisbursement.form.paymentDate')"
              :placeholder="t('actionFundDisbursement.form.paymentDatePlaceholder')"
              :modelValue="form.payment_date"
            />
          </div>

          <!-- Cheque reference -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="cheque_reference"
              name="cheque_reference"
              :label="t('actionFundDisbursement.form.chequeReference')"
              :placeholder="t('actionFundDisbursement.form.chequeReferencePlaceholder')"
              :modelValue="form.cheque_reference"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('actionFundDisbursement.sections.expenseType') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <div v-if="form.expense_types?.length">
              <div class="flex flex-wrap gap-2">
                <TagBadge
                  v-for="(expenseType, index) in form.expense_types"
                  :key="index"
                  :label="expenseType.name"
                  customClass="bg-green-100 text-green-800 font-medium"
                />
              </div>
            </div>
            <div v-else class="text-red-500 text-sm mt-2">
              {{ t('actionFundDisbursement.expenseTypes.noExpenseTypes') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useActionFundDisbursementStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import TagBadge from '../TagBadge.vue';
import { FileText } from 'lucide-vue-next';

const store = useActionFundDisbursementStore();
const form = store.form;

const { formatCurrency } = useCurrencyFormatter();

const actionCurrencyCode = computed(() => {
  return form.action?.currency || null;
});

const formatAmount = (amount, currencyCode) => {
  if (!amount || !currencyCode) return '';
  return formatCurrency.value(parseFloat(amount), currencyCode);
};
</script>
  