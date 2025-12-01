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
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
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
            <InputReadonly
              id="action"
              name="action"
              :label="t('actionFundReceipt.form.action')"
              :placeholder="t('actionFundReceipt.form.actionPlaceholder')"
              :model-value="form.action?.reference"
            />
          </div>

          <!-- Funding Source -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="funding_source"
              name="funding_source"
              :label="t('actionFundReceipt.form.fundingSource')"
              :placeholder="t('actionFundReceipt.form.fundingSourcePlaceholder')"
              :modelValue="form.funding_source"
            />
          </div>

          <!-- Receipt Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="receipt_date"
              name="receipt_date"
              :label="t('actionFundReceipt.form.receiptDate')"
              :placeholder="t('actionFundReceipt.form.receiptDatePlaceholder')"
              :modelValue="form.receipt_date"
            />
          </div>

          <!-- Validity Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="validity_date"
              name="validity_date"
              :label="t('actionFundReceipt.form.validityDate')"
              :placeholder="t('actionFundReceipt.form.validityDatePlaceholder')"
              :modelValue="form.validity_date"
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
            <InputReadonly
              id="currency"
              name="currency"
              :label="t('actionFundReceipt.form.currency')"
              :placeholder="t('actionFundReceipt.form.currencyPlaceholder')"
              :modelValue="form.currency?.code"
            />
          </div>

          <!-- Original Amount -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="amount_original"
              name="amount_original"
              :label="t('actionFundReceipt.form.amountOriginal')"
              :placeholder="t('actionFundReceipt.form.amountOriginalPlaceholder')"
              :modelValue="formatAmount(form.amount_original, form.currency?.code)"
            />
          </div>

          <!-- Exchange Rate -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="showConvertedAmount">
            <InputReadonly
              id="exchange_rate"
              name="exchange_rate"
              :label="t('actionFundReceipt.form.exchangeRate')"
              :placeholder="t('actionFundReceipt.form.exchangeRatePlaceholder')"
              :modelValue="parseFloat(form.exchange_rate)"
            />
          </div>

          <!-- Converted Amount -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="showConvertedAmount">
            <InputReadonly
              id="converted_amount"
              name="converted_amount"
              :label="t('actionFundReceipt.form.convertedAmount')"
              :placeholder="t('actionFundReceipt.form.convertedAmountPlaceholder')"
              :modelValue="
                formatAmount(form.amount_original * form.exchange_rate, actionCurrencyCode)
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useActionFundReceiptStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';

const store = useActionFundReceiptStore();
const form = store.form;

const { formatCurrency } = useCurrencyFormatter();

const actionCurrencyCode = computed(() => {
  return form.action?.currency || null;
});

const showConvertedAmount = computed(() => {
  return (
    form.currency?.code &&
    actionCurrencyCode.value &&
    form.currency.code !== actionCurrencyCode.value
  );
});

const formatAmount = (amount, currencyCode) => {
  if (!amount || !currencyCode) return '';
  return formatCurrency.value(parseFloat(amount), currencyCode);
};
</script>
