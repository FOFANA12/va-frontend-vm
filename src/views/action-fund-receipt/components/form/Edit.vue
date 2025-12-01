<template>
  <div class="card mt-4">
    <div class="flex justify-end mb-4">
      <a
        href="https://www.bcm.mr/cours-de-change.html"
        target="_blank"
        rel="noopener noreferrer"
        class="border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm px-3 py-2 rounded-lg transition-all inline-flex items-center gap-1"
      >
        {{ t('actionFundReceipt.linkExchangeRates') }}
      </a>
    </div>

    <!-- Informations de base -->
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('actionFundReceipt.sections.basicInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Reference -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="context === 'edit'">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('actionFundReceipt.form.reference')"
              :placeholder="t('actionFundReceipt.form.reference')"
              :model-value="form.reference"
            />
          </div>

          <!-- Action -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              v-if="context !== 'edit'"
              id="action"
              name="action"
              v-model="form.action"
              @update:modelValue="onChangeAction"
              :label="t('actionFundReceipt.form.action')"
              :options="store.actions"
              :placeholder="t('actionFundReceipt.form.actionPlaceholder')"
              :error="form.errors.get('action')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
            <InputReadonly
              v-else
              id="action"
              name="action"
              :label="t('actionFundReceipt.form.action')"
              :placeholder="t('actionFundReceipt.form.actionPlaceholder')"
              :model-value="form.action?.reference"
            />
          </div>

          <!-- Funding source -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="funding_source"
              name="funding_source"
              v-model="form.funding_source"
              :label="t('actionFundReceipt.form.fundingSource')"
              :options="store.fundingSources"
              :placeholder="t('actionFundReceipt.form.fundingSourcePlaceholder')"
              :error="form.errors.get('funding_source')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>

          <!-- Receipt date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="receipt_date"
              name="receipt_date"
              v-model="form.receipt_date"
              :label="t('actionFundReceipt.form.receiptDate')"
              :placeholder="t('actionFundReceipt.form.receiptDatePlaceholder')"
              :error="form.errors.get('receipt_date')"
              required
            />
          </div>

          <!-- Validity date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="validity_date"
              name="validity_date"
              v-model="form.validity_date"
              :label="t('actionFundReceipt.form.validityDate')"
              :placeholder="t('actionFundReceipt.form.validityDatePlaceholder')"
              :error="form.errors.get('validity_date')"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg mt-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('actionFundReceipt.sections.financialInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Currency -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="currency"
              name="currency"
              v-model="form.currency"
              :label="t('actionFundReceipt.form.currency')"
              :options="store.currencies"
              :placeholder="t('actionFundReceipt.form.currencyPlaceholder')"
              :error="form.errors.get('currency')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>

          <!-- Original amount -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="amount_original"
              name="amount_original"
              type="number"
              v-model.number="form.amount_original"
              :label="t('actionFundReceipt.form.amountOriginal')"
              :placeholder="t('actionFundReceipt.form.amountOriginalPlaceholder')"
              :error="form.errors.get('amount_original')"
              :form="form"
              required
            />
          </div>

          <!-- Exchange rate -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="showExchangeRate">
            <Input
              id="exchange_rate"
              name="exchange_rate"
              type="number"
              v-model.number="form.exchange_rate"
              :label="t('actionFundReceipt.form.exchangeRate')"
              :placeholder="t('actionFundReceipt.form.exchangeRatePlaceholder')"
              :error="form.errors.get('exchange_rate')"
              :form="form"
              required
            />
          </div>

          <!-- Converted amount -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="showExchangeRate">
            <InputReadonly
              id="converted_amount"
              name="converted_amount"
              :modelValue="convertedAmount"
              :label="t('actionFundReceipt.form.convertedAmount')"
              :placeholder="t('actionFundReceipt.form.convertedAmountPlaceholder')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActionFundReceiptStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import { useThousandSeparator } from '@/composables/useThousandSeparator';

const store = useActionFundReceiptStore();
const form = store.form;

const { formatCurrency } = useCurrencyFormatter();
const { formatNumber } = useThousandSeparator();

const actionCurrencyCode = computed(() => {
  if (props.context === 'edit') {
    return form.action?.currency || null;
  }

  const selectedAction = store.actions.find((a) => a.uuid === form.action);
  if (!selectedAction?.currency) return null;

  return selectedAction?.currency || null;
});

const currentCurrencyCode = computed(() => {
  const selectedCurrency = store.currencies.find((c) => c.uuid === form.currency);
  console.log(selectedCurrency?.code);

  return selectedCurrency?.code || null;
});

const showExchangeRate = computed(() => {
  console.log(`Show exchange si ${actionCurrencyCode.value}`);
  if (!actionCurrencyCode.value || !currentCurrencyCode.value) {
    return false;
  }
  return currentCurrencyCode.value !== actionCurrencyCode.value;
});

watchEffect(() => {
  const original = parseFloat(form.amount_original) || 0;
  const rate = parseFloat(form.exchange_rate) || 1;
  form.converted_amount = original * rate;
});

const convertedAmount = computed(() => {
  if (actionCurrencyCode.value) {
    return formatCurrency.value(form.converted_amount, actionCurrencyCode.value);
  }
  return formatNumber.value(form.converted_amount);
});

const onChangeAction = (actionUuid) => {
  const selectedAction = store.actions.find((a) => a.uuid === actionUuid);
  if (selectedAction?.currency_uuid) {
    form.currency = selectedAction.currency_uuid;
  }
  if (!showExchangeRate.value) {
    form.exchange_rate = 1;
  }
};

watch(
  () => form.currency,
  () => {
    if (!showExchangeRate.value) {
      form.exchange_rate = 1;
    }
  }
);

const props = defineProps({
  context: { type: String, default: 'create' },
});

onMounted(() => {
  if (!showExchangeRate.value) {
    form.exchange_rate = 1;
  }
});
</script>
