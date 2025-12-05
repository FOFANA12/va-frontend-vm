<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg" v-if="context !== 'create'">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('elementaryLevel.sections.statusDetail') }}
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

    <div class="w-full mx-auto bg-white rounded-lg mt-6" v-if="context !== 'create'">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('elementaryLevel.sections.stateDetail') }}
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
          <div v-if="form.reference" class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('elementaryLevel.form.reference')"
              :placeholder="t('elementaryLevel.form.referencePlaceholder')"
              :modelValue="form.reference"
              readonly
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="name"
              name="name"
              :label="t('elementaryLevel.form.name')"
              v-model="form.name"
              :placeholder="t('elementaryLevel.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <!-- Starte date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="start_date"
              name="start_date"
              v-model="form.start_date"
              :label="t('elementaryLevel.form.startDate')"
              :placeholder="t('elementaryLevel.form.startDatePlaceholder')"
              :error="form.errors.get('start_date')"
              required
            />
          </div>

          <!-- end date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="end_date"
              name="end_date"
              v-model="form.end_date"
              :label="t('elementaryLevel.form.endDate')"
              :placeholder="t('elementaryLevel.form.endDatePlaceholder')"
              :error="form.errors.get('end_date')"
              required
            />
          </div>

          <!-- Currency -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="currency"
              name="currency"
              :label="t('elementaryLevel.form.currency')"
              :placeholder="t('elementaryLevel.form.currencyPlaceholder')"
              :modelValue="form.currency"
            />
          </div>

          <!-- Responsible -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="responsible"
              name="responsible"
              v-model="form.responsible"
              :label="t('elementaryLevel.form.responsible')"
              :options="store.responsibles"
              :placeholder="t('elementaryLevel.form.responsiblePlaceholder')"
              :error="form.errors.get('responsible')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
            />
          </div>

          <!-- Capability domain -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="capability_domain"
              name="capability_domain"
              v-model="form.capability_domain"
              :label="t('elementaryLevel.form.capabilityDomain')"
              :options="store.capabilityDomains"
              :placeholder="t('elementaryLevel.form.capabilityDomainPlaceholder')"
              :error="form.errors.get('elementary_level')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('elementaryLevel.sections.beneficiaryInformation') }}
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
                  :key="beneficiary.uuid || index"
                  :label="beneficiary.name"
                  removable
                  @remove="form.beneficiaries.splice(index, 1)"
                  customClass="bg-green-100 text-green-800 font-medium"
                />
              </div>
            </div>
            <div v-else class="text-red-500 text-sm mt-2">
              {{ t('elementaryLevel.beneficiaries.noBeneficiaries') }}
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            type="button"
            class="text-sm text-primary-600 hover:underline hover:text-primary-700 font-medium"
            @click="openBeneficiaryModal"
          >
            {{ t('elementaryLevel.beneficiaries.addBeneficiary') }}
          </button>
        </div>
      </div>
    </div>

    <Alert
      v-if="alertStore.hasMessage"
      :type="alertStore.message.type"
      :message="alertStore.message.text"
      @close="alertStore.resetMessage()"
      class="my-4"
    />

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('elementaryLevel.sections.fundingSourcesInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="w-full mx-auto bg-white rounded-lg">
        <div class="card-body p-4 flex items-center justify-center">
          <SearchInput
            v-model:search="localSearch"
            mode="local"
            show-all-on-focus
            :options="store.fundingSources"
            :placeholder="t('elementaryLevel.fundingSources.searchPlaceholder')"
            @select="handleFundingSourceSelect"
            :min-chars="2"
            :max-height="300"
            :filter-function="filterFundingSource"
            :helper-message="t('common.searchMinCharPlaceholder')"
            inputClass="h-12"
            class="w-full max-w-xl transition-all duration-300 ease-in-out"
          >
            <template #result="{ item }">
              <div class="flex items-center space-x-3">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  {{ item.name.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-secondary-900 truncate" :title="item.name">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </template>
          </SearchInput>
        </div>
      </div>

      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <div class="overflow-x-auto">
              <table class="min-w-full table-auto border-collapse border border-gray-200">
                <thead class="bg-gray-50 text-gray-700 text-sm">
                  <tr>
                    <th class="p-2 border text-left w-[50%]">
                      {{ t('elementaryLevel.fundingSources.name') }}
                    </th>
                    <th class="p-2 border text-left w-[20%]">
                      {{ t('elementaryLevel.fundingSources.plannedAmount') }}
                    </th>
                    <th class="p-2 border text-center w-[60px]">
                      {{ t('common.table.actions') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!form.funding_sources?.length">
                    <td colspan="3" class="text-center text-red-500 py-4 border">
                      {{ t('elementaryLevel.fundingSources.noFundingSources') }}
                    </td>
                  </tr>
                  <tr
                    v-for="(source, index) in form.funding_sources"
                    :key="source.uuid || index"
                    class="bg-white even:bg-gray-50"
                  >
                    <td class="p-2 border">{{ source.name }}</td>
                    <td class="p-2 border">
                      <input
                        type="text"
                        v-model="source.planned_amount"
                        :placeholder="t('elementaryLevel.fundingSources.plannedAmount')"
                        class="w-full py-1.5 px-3 rounded-lg text-sm text-gray-800 bg-white border focus:outline-none border-gray-300 focus:border-primary-300 focus:ring-primary-500/10"
                      />
                    </td>
                    <td class="p-2 border text-center">
                      <button
                        type="button"
                        class="text-red-500 hover:text-red-700"
                        @click="form.funding_sources.splice(index, 1)"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>

                  <!-- Total planned amount -->
                  <tr
                    v-if="form.funding_sources?.length"
                    class="font-semibold format-number bg-gray-100"
                  >
                    <td class="p-2 border text-right">
                      {{ t('elementaryLevel.fundingSources.plannedBudget') }}
                    </td>
                    <td class="p-2 border">
                      {{ formatCurrency(totalPlannedAmount, currentCurrencyCode) }}
                    </td>
                    <td class="p-2 border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('elementaryLevel.sections.descriptiveCharacteristics') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="flex flex-col gap-6">
          <!-- Description -->
          <div class="col-span-12">
            <Textarea
              id="description"
              name="description"
              v-model="form.description"
              :label="t('elementaryLevel.form.description')"
              :placeholder="t('elementaryLevel.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :rows="7"
            />
          </div>

          <!-- Prerequisites -->
          <div class="col-span-12">
            <Textarea
              id="prerequisites"
              name="prerequisites"
              v-model="form.prerequisites"
              :label="t('elementaryLevel.form.prerequisites')"
              :placeholder="t('elementaryLevel.form.prerequisitesPlaceholder')"
              :error="form.errors.get('prerequisites')"
              :rows="7"
            />
          </div>

          <!-- Impact -->
          <div class="col-span-12">
            <Textarea
              id="impacts"
              name="impacts"
              v-model="form.impacts"
              :label="t('elementaryLevel.form.impacts')"
              :placeholder="t('elementaryLevel.form.impactsPlaceholder')"
              :error="form.errors.get('impacts')"
              :rows="7"
            />
          </div>

          <!-- Risks -->
          <div class="col-span-12">
            <Textarea
              id="risks"
              name="risks"
              v-model="form.risks"
              :label="t('elementaryLevel.form.risks')"
              :placeholder="t('elementaryLevel.form.risksPlaceholder')"
              :error="form.errors.get('risks')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
    <BeneficiariesPickerModal ref="modalBeneficiary" @onSelect="handleBeneficiariesSelect" />
  </div>
</template>
  
  <script setup>
import { useElementaryLevelStore, useSettingsCurrencyStore, useAlertStore } from '@/store';
import SearchInput from '@/components/ui/SearchInput.vue';
import TagBadge from '../TagBadge.vue';
import BeneficiariesPickerModal from '../BeneficiariesPickerModal.vue';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import { Trash2 } from 'lucide-vue-next';

const store = useElementaryLevelStore();
const alertStore = useAlertStore();

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const modalBeneficiary = ref(null);
const localSearch = ref('');
const form = store.form;

const currencyStore = useSettingsCurrencyStore();
const { formatCurrency } = useCurrencyFormatter();

const currentCurrencyCode = computed(() => {
  return store.defaultCurrency?.code || currencyStore.defaultCurrency?.code;
});

const filterFundingSource = (term, options) => {
  if (!term || term.length < 2) return [];
  return options.filter((f) => f.name.toLowerCase().includes(term.toLowerCase()));
};

const handleFundingSourceSelect = (item) => {
  const exists = form.funding_sources.some((f) => f.uuid === item.uuid);
  if (!exists) {
    form.funding_sources.push({ uuid: item.uuid, name: item.name, planned_amount: 0 });
  }
};

const totalPlannedAmount = computed(() => {
  return form.funding_sources.reduce((total, fundingSource) => {
    const amount = parseFloat(fundingSource.planned_amount) || 0;
    return total + amount;
  }, 0);
});

const openBeneficiaryModal = () => {
  if (modalBeneficiary.value?.openModal) {
    modalBeneficiary.value.openModal();
  }
};

const handleBeneficiariesSelect = (selectedItems) => {
  const existingUuids = form.beneficiaries.map((b) => b.uuid);

  const newBeneficiaries = selectedItems.filter((item) => !existingUuids.includes(item.uuid));

  form.beneficiaries.push(...newBeneficiaries);
};

onMounted(() => {
  if (!form.currency) {
    form.currency = store.defaultCurrency?.code || currencyStore.defaultCurrency?.code;
  }
});
</script>
  