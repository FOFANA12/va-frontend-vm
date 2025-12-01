<template>
  <div class="card mt-4">
    <!-- Company general informations -->
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('supplier.sections.generalInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Company name -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="contract_type"
              name="company_name"
              :label="t('supplier.form.companyName')"
              :placeholder="t('supplier.form.companyNamePlaceholder')"
              :modelValue="form.company_name"
            />
          </div>
          <!-- Tax number -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="tax_number"
              name="tax_number"
              :label="t('supplier.form.taxNumber')"
              :placeholder="t('supplier.form.taxNumberPlaceholder')"
              :modelValue="form.tax_number"
            />
          </div>
          <!-- Register number -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="register_number"
              name="register_number"
              :label="t('supplier.form.registerNumber')"
              :placeholder="t('supplier.form.registerNumberPlaceholder')"
              :modelValue="form.register_number"
            />
          </div>
          <!-- Establishment year -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="establishment_year"
              name="establishment_year"
              :label="t('supplier.form.establishmentYear')"
              :placeholder="t('supplier.form.establishmentYearPlaceholder')"
              :modelValue="form.establishment_year"
            />
          </div>
          <!--Capital -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="capital"
              name="capital"
              :label="t('supplier.form.capital')"
              :placeholder="t('supplier.form.capitalPlaceholder')"
              :modelValue="formatCurrency(form.capital, currencyStore.defaultCurrency.code)"
            />
          </div>
          <!-- Annual turnover -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="annual_turnover"
              name="annual_turnover"
              :label="t('supplier.form.annualTurnover')"
              :placeholder="t('supplier.form.annualTurnoverPlaceholder')"
              :modelValue="formatCurrency(form.annual_turnover, currencyStore.defaultCurrency.code)"
            />
          </div>
          <!-- Employees count -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="employees_count"
              name="employees_count"
              :label="t('supplier.form.employeesCount')"
              :placeholder="t('supplier.form.employeesCountPlaceholder')"
              :modelValue="form.employees_count"
            />
          </div>
          <!-- Note -->
          <div class="col-span-12 md:col-span-4">
            <CustomStarRating
              id="note"
              :modelValue="Number(form.note)"
              :label="t('supplier.form.note')"
              :starSize="25"
              allowHalf
              readOnly
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
        </div>
      </div>
    </div>

    <!--  Responsible information informations -->
    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('supplier.sections.responsibleInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Contract type -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="contract_type"
              name="contract_type"
              :label="t('supplier.form.contractType')"
              :placeholder="t('supplier.form.contractTypePlaceholder')"
              :modelValue="form.contract_type"
            />
          </div>
          <!-- Name -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('supplier.form.name')"
              :placeholder="t('supplier.form.namePlaceholder')"
              :modelValue="form.name"
            />
          </div>
          <!-- Phone -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="phone"
              name="phone"
              :label="t('supplier.form.phone')"
              :placeholder="t('supplier.form.phonePlaceholder')"
              :modelValue="form.phone"
            />
          </div>
          <!-- Whatsapp -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="whatsapp"
              name="whatsapp"
              :label="t('supplier.form.whatsapp')"
              :placeholder="t('supplier.form.whatsappPlaceholder')"
              :modelValue="form.whatsapp"
            />
          </div>
          <!-- Email -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="email"
              name="email"
              :label="t('supplier.form.email')"
              :placeholder="t('supplier.form.emailPlaceholder')"
              :modelValue="form.email"
            />
          </div>
          <!-- Address -->
          <div class="grid grid-cols-12 gap-4 md:col-span-12 mt-4">
            <div class="col-span-12">
              <TextareaReadonly
                id="address"
                name="address"
                :model-value="form.address"
                :label="t('supplier.form.address')"
                :placeholder="t('supplier.form.addressPlaceholder')"
                :rows="7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useSupplierStore, useSettingsCurrencyStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import CustomStarRating from '@/components/ui/CustomStarRating.vue';

const { formatCurrency } = useCurrencyFormatter();
const currencyStore = useSettingsCurrencyStore();

// Stores
const store = useSupplierStore();
const form = store.form;
</script>
