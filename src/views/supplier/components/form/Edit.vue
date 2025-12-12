<template>
  <div class="card mt-4">
    <!-- general informations -->
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
            <Input
              id="company_name"
              name="company_name"
              :label="t('supplier.form.companyName')"
              v-model="form.company_name"
              :placeholder="t('supplier.form.companyNamePlaceholder')"
              :error="form.errors.get('company_name')"
              :form="form"
              required
            />
          </div>
          <!-- Tax number -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="tax_number"
              name="tax_number"
              :label="t('supplier.form.taxNumber')"
              v-model="form.tax_number"
              :placeholder="t('supplier.form.taxNumberPlaceholder')"
              :error="form.errors.get('tax_number')"
              :form="form"
              required
            />
          </div>
          <!-- Register number -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="register_number"
              name="register_number"
              :label="t('supplier.form.registerNumber')"
              v-model="form.register_number"
              :placeholder="t('supplier.form.registerNumberPlaceholder')"
              :error="form.errors.get('register_number')"
              :form="form"
            />
          </div>
          <!-- Establishment year -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="establishment_year"
              name="establishment_year"
              :label="t('supplier.form.establishmentYear')"
              v-model="form.establishment_year"
              :placeholder="t('supplier.form.establishmentYearPlaceholder')"
              :error="form.errors.get('establishment_year')"
              :form="form"
            />
          </div>
          <!-- Capital -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="capital"
              name="capital"
              :label="
                currencyStore.defaultCurrency?.code
                  ? `${t('supplier.form.capital')} (${currencyStore.defaultCurrency.code})`
                  : t('supplier.form.capital')
              "
              :placeholder="t('supplier.form.capitalPlaceholder')"
              v-model="form.capital"
              :error="form.errors.get('capital')"
              :form="form"
              required
            />
          </div>

          <!-- Annual turnover -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="annual_turnover"
              name="annual_turnover"
              :label="
                currencyStore.defaultCurrency?.code
                  ? `${t('supplier.form.annualTurnover')} (${currencyStore.defaultCurrency.code})`
                  : t('supplier.form.annualTurnover')
              "
              :placeholder="t('supplier.form.annualTurnoverPlaceholder')"
              v-model="form.annual_turnover"
              :error="form.errors.get('annual_turnover')"
              :form="form"
              required
            />
          </div>
          <!-- Employees count -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="employees_count"
              name="employees_count"
              :label="t('supplier.form.employeesCount')"
              v-model="form.employees_count"
              :placeholder="t('supplier.form.employeesCountPlaceholder')"
              :error="form.errors.get('employees_count')"
              :form="form"
              required
            />
          </div>

          <!-- Note -->
          <div v-if="context === 'edit'" class="col-span-12 md:col-span-4">
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
            />
            <label for="status" class="text-gray-700">
              {{ t('common.form.status') }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Responsible information informations -->
    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('supplier.sections.responsibleInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Name -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="name"
              name="name"
              :label="t('supplier.form.name')"
              v-model="form.name"
              :placeholder="t('supplier.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>
          <!-- Phone -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="phone"
              name="phone"
              :label="t('supplier.form.phone')"
              v-model="form.phone"
              :placeholder="t('supplier.form.phonePlaceholder')"
              :error="form.errors.get('phone')"
              :form="form"
              required
            />
          </div>
          <!-- Whatsapp -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="whatsapp"
              name="whatsapp"
              :label="t('supplier.form.whatsapp')"
              v-model="form.whatsapp"
              :placeholder="t('supplier.form.whatsappPlaceholder')"
              :error="form.errors.get('whatsapp')"
              :form="form"
            />
          </div>

          <!-- Email -->
          <div class="col-span-12 md:col-span-4">
            <Input
              id="email"
              name="email"
              :label="t('supplier.form.email')"
              v-model="form.email"
              :placeholder="t('supplier.form.emailPlaceholder')"
              :error="form.errors.get('email')"
              :form="form"
            />
          </div>
          <!-- Address -->
          <div class="grid grid-cols-12 md:col-span-12 gap-4 mt-4">
            <div class="col-span-12">
              <Textarea
                id="address"
                name="address"
                v-model="form.address"
                :label="t('supplier.form.address')"
                :placeholder="t('supplier.form.addressPlaceholder')"
                :error="form.errors.get('address')"
                :form="form"
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

import CustomStarRating from '@/components/ui/CustomStarRating.vue';
const currencyStore = useSettingsCurrencyStore();
// Props
const props = defineProps({
  context: {
    type: String,
    default: 'create',
  },
});

// Stores
const store = useSupplierStore();
const form = store.form;
</script>
