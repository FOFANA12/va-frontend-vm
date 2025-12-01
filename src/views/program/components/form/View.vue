<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('program.sections.statusDetail') }}
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

    <div class="w-full mx-auto bg-white rounded-lg mt-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('program.sections.stateDetail') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- State -->
          <div class="col-span-12 md:col-span-4">
            <StatusField
              :status="form.state"
              :label="t('common.form.state')"
              :placeholder="t('common.form.state')"
              display-key="label"
            />
          </div>

          <!-- State Changed At -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="state_changed_at"
              name="state_changed_at"
              :label="t('common.form.stateChangedAt')"
              :model-value="form?.state_changed_at || '-'"
            />
          </div>

          <!-- State Changed By -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="state_changed_by"
              name="state_changed_by"
              :label="t('common.form.stateChangedBy')"
              :model-value="form.state_changed_by || '-'"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg mt-6">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Reference -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('program.form.reference')"
              :placeholder="t('program.form.referencePlaceholder')"
              :modelValue="form.reference"
              readonly
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('program.form.name')"
              :placeholder="t('program.form.namePlaceholder')"
              :modelValue="form.name"
              readonly
            />
          </div>

          <!-- Start date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="startDate"
              name="startDate"
              :label="t('program.form.startDate')"
              :placeholder="t('program.form.startDatePlaceholder')"
              :modelValue="form.start_date"
              readonly
            />
          </div>

          <!-- End date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="endDate"
              name="endDate"
              :label="t('program.form.endDate')"
              :placeholder="t('program.form.endDatePlaceholder')"
              :modelValue="form.end_date"
              readonly
            />
          </div>

          <!-- Currency -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="currency"
              name="currency"
              :label="t('program.form.currency')"
              :placeholder="t('program.form.currencyPlaceholder')"
              :modelValue="form.currency?.code"
              readonly
            />
          </div>

          <!-- Responsible -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="responsible"
              name="responsible"
              :label="t('program.form.responsible')"
              :placeholder="t('program.form.responsiblePlaceholder')"
              :modelValue="form.responsible"
              readonly
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('program.sections.beneficiaryInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <div v-if="form.beneficiaries?.length">
              <div class="flex flex-wrap gap-2">
                <TagBadge
                  v-for="(beneficiary, index) in form.beneficiaries"
                  :key="index"
                  :label="beneficiary.name"
                  customClass="bg-green-100 text-green-800 font-medium"
                />
              </div>
            </div>
            <div v-else class="text-red-500 text-sm mt-2">
              {{ t('program.beneficiaries.noBeneficiaries') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('program.sections.fundingSourcesInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-200">
            <thead class="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th class="p-2 border text-left w-[50%]">
                  {{ t('program.fundingSources.name') }}
                </th>
                <th class="p-2 border text-left w-[20%]">
                  {{ t('program.fundingSources.plannedAmount') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!form.funding_sources?.length">
                <td colspan="3" class="text-center text-red-500 py-4 border">
                  {{ t('program.fundingSources.noFundingSources') }}
                </td>
              </tr>
              <tr
                v-for="(source, index) in form.funding_sources"
                :key="index"
                class="bg-white even:bg-gray-50"
              >
                <td class="p-2 border">{{ source.name }}</td>
                <td class="p-2 border">
                  {{ formatCurrency(source.planned_amount, currentCurrencyCode) }}
                </td>
              </tr>

              <!-- Total planned amount -->
              <tr
                v-if="form.funding_sources?.length"
                class="font-semibold format-number bg-gray-100"
              >
                <td class="p-2 border text-right">
                  {{ t('program.fundingSources.plannedBudget') }}
                </td>
                <td class="p-2 border">
                  {{ formatCurrency(totalPlannedAmount, currentCurrencyCode) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('program.sections.descriptiveCharacteristics') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="flex flex-col gap-6">
          <!-- Description -->
          <div class="col-span-12">
            <TextareaReadonly
              id="description"
              name="description"
              v-model="form.description"
              :label="t('program.form.description')"
              :placeholder="t('program.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :rows="7"
            />
          </div>

          <!-- Prerequisites -->
          <div class="col-span-12">
            <TextareaReadonly
              id="prerequisites"
              name="prerequisites"
              v-model="form.prerequisites"
              :label="t('program.form.prerequisites')"
              :placeholder="t('program.form.prerequisitesPlaceholder')"
              :error="form.errors.get('prerequisites')"
              :rows="7"
            />
          </div>

          <!-- Impact -->
          <div class="col-span-12">
            <TextareaReadonly
              id="impacts"
              name="impacts"
              v-model="form.impacts"
              :label="t('program.form.impacts')"
              :placeholder="t('program.form.impactsPlaceholder')"
              :error="form.errors.get('impacts')"
              :rows="7"
            />
          </div>

          <!-- Risks -->
          <div class="col-span-12">
            <TextareaReadonly
              id="risks"
              name="risks"
              v-model="form.risks"
              :label="t('program.form.risks')"
              :placeholder="t('program.form.risksPlaceholder')"
              :error="form.errors.get('risks')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useProgramStore, useSettingsCurrencyStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import TagBadge from '../TagBadge.vue';
const store = useProgramStore();
const currencyStore = useSettingsCurrencyStore();

const form = store.form;
const { formatCurrency } = useCurrencyFormatter();

const currentCurrencyCode = computed(() => {
  return form.currency?.code || currencyStore.defaultCurrency?.code;
});

const totalPlannedAmount = computed(() => {
  return form.funding_sources.reduce((total, fundingSource) => {
    const amount = parseFloat(fundingSource.planned_amount) || 0;
    return total + amount;
  }, 0);
});
</script>
  