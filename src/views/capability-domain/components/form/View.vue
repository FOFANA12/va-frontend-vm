<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('capabilityDomain.sections.statusDetail') }}
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
          {{ t('capabilityDomain.sections.stateDetail') }}
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
              :label="t('capabilityDomain.form.reference')"
              :placeholder="t('capabilityDomain.form.referencePlaceholder')"
              :modelValue="form.reference"
              readonly
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('capabilityDomain.form.name')"
              :placeholder="t('capabilityDomain.form.namePlaceholder')"
              :modelValue="form.name"
              readonly
            />
          </div>

          <!-- Start date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="startDate"
              name="startDate"
              :label="t('capabilityDomaincapabilityDomain.form.startDate')"
              :placeholder="t('capabilityDomaincapabilityDomain.form.startDatePlaceholder')"
              :modelValue="form.start_date"
              readonly
            />
          </div>

          <!-- End date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="endDate"
              name="endDate"
              :label="t('capabilityDomaincapabilityDomain.form.endDate')"
              :placeholder="t('capabilityDomaincapabilityDomain.form.endDatePlaceholder')"
              :modelValue="form.end_date"
              readonly
            />
          </div>

          <!-- Currency -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="currency"
              name="currency"
              :label="t('capabilityDomain.form.currency')"
              :placeholder="t('capabilityDomain.form.currencyPlaceholder')"
              :modelValue="form.currency"
              readonly
            />
          </div>

          <!-- Responsible -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="responsible"
              name="responsible"
              :label="t('capabilityDomain.form.responsible')"
              :placeholder="t('capabilityDomain.form.responsiblePlaceholder')"
              :modelValue="form.responsible"
              readonly
            />
          </div>

          <!-- Strategic domain -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="strategic_domain"
              name="strategic_domain"
              :label="t('capabilityDomain.form.strategicDomain')"
              :placeholder="t('capabilityDomain.form.strategicDomainPlaceholder')"
              :modelValue="form.strategic_domain"
              readonly
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('capabilityDomain.sections.beneficiaryInformation') }}
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
              {{ t('capabilityDomain.beneficiaries.noBeneficiaries') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('capabilityDomain.sections.fundingSourcesInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-200">
            <thead class="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th class="p-2 border text-left w-[50%]">
                  {{ t('capabilityDomain.fundingSources.name') }}
                </th>
                <th class="p-2 border text-left w-[20%]">
                  {{ t('capabilityDomain.fundingSources.plannedAmount') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!form.funding_sources?.length">
                <td colspan="3" class="text-center text-red-500 py-4 border">
                  {{ t('capabilityDomain.fundingSources.noFundingSources') }}
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
                  {{ t('capabilityDomain.fundingSources.plannedBudget') }}
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
          {{ t('capabilityDomain.sections.descriptiveCharacteristics') }}
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
              :label="t('capabilityDomain.form.description')"
              :placeholder="t('capabilityDomain.form.descriptionPlaceholder')"
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
              :label="t('capabilityDomain.form.prerequisites')"
              :placeholder="t('capabilityDomain.form.prerequisitesPlaceholder')"
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
              :label="t('capabilityDomain.form.impacts')"
              :placeholder="t('capabilityDomain.form.impactsPlaceholder')"
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
              :label="t('capabilityDomain.form.risks')"
              :placeholder="t('capabilityDomain.form.risksPlaceholder')"
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
import { useCapabilityDomainStore, useSettingsCurrencyStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import TagBadge from '../TagBadge.vue';
const store = useCapabilityDomainStore();
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
  