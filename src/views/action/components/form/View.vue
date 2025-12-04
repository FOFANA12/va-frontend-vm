<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('action.sections.statusDetail') }}
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

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('action.sections.basicInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Auteur -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="form.author">
            <InputReadonly
              id="author"
              name="author"
              :label="t('common.form.author')"
              :placeholder="t('common.form.author')"
              :model-value="form.author"
            />
          </div>

          <!-- Reference -->
          <div v-if="form.reference" class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('action.form.reference')"
              :placeholder="t('action.form.reference')"
              :modelValue="form.reference"
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('action.form.name')"
              :placeholder="t('action.form.namePlaceholder')"
              :modelValue="form.name"
            />
          </div>

          <!-- Structure -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="structure"
              name="structure"
              :label="t('action.form.structure')"
              :placeholder="t('action.form.structurePlaceholder')"
              :modelValue="form.structure"
            />
          </div>

          <!-- Action plan -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="action_plan"
              name="action_plan"
              :label="t('action.form.actionPlan')"
              :placeholder="t('action.form.actionPlanPlaceholder')"
              :modelValue="form.action_plan"
            />
          </div>

          <!-- Priority level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="priority"
              name="priority"
              :label="t('action.form.priority')"
              :placeholder="t('action.form.priorityPlaceholder')"
              :modelValue="form.priority?.label"
            />
          </div>

          <!-- Risk level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="risk_level"
              name="risk_level"
              :label="t('action.form.riskLevel')"
              :placeholder="t('action.form.riskLevelPlaceholder')"
              :modelValue="form.risk_level?.label"
            />
          </div>

          <!-- Project owner -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="project_owner"
              name="project_owner"
              :label="t('action.form.projectOwner')"
              :placeholder="t('action.form.projectOwnerPlaceholder')"
              :modelValue="form.project_owner"
            />
          </div>

          <!-- Delegated project owner -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="delegated_project_owner"
              name="delegated_project_owner"
              :label="t('action.form.delegatedProjectOwner')"
              :placeholder="t('action.form.delegatedProjectOwnerPlaceholder')"
              :modelValue="form.delegated_project_owner"
            />
          </div>

          <!-- Generate document type -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="generate_document_type"
              name="generate_document_type"
              :label="t('action.form.generateDocumentType')"
              :placeholder="t('action.form.generateDocumentTypePlaceholder')"
              :modelValue="form.generate_document_type"
            />
          </div>

          <!-- Currency -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="currency"
              name="currency"
              :label="t('action.form.currency')"
              :placeholder="t('action.form.currencyPlaceholder')"
              :modelValue="form.currency"
            />
          </div>

          <!-- State -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <StatusField
              :status="form.state"
              :label="t('common.form.state')"
              :placeholder="t('common.form.state')"
              display-key="label"
            />
          </div>

          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <a
              :href="form.download_selection_mode_url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:underline"
            >
              {{ t('action.downloadSelectionMode') }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Responsible Structure & Responsible -->
    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('action.sections.responsible') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Responsible Structure -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="responsible_structure"
              name="responsible_structure"
              :label="t('action.form.responsibleStructure')"
              :placeholder="t('action.form.responsibleStructurePlaceholder')"
              :modelValue="form.responsible_structure"
            />
          </div>

          <!-- Responsible User -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              id="responsible"
              name="responsible"
              :label="t('action.form.responsible')"
              :placeholder="t('action.form.responsiblePlaceholder')"
              :modelValue="form.responsible"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('action.sections.locationAndContext') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Region -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="region"
              name="region"
              :label="t('action.form.region')"
              :placeholder="t('action.form.regionPlaceholder')"
              :modelValue="form.region"
            />
          </div>

          <!-- Department -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="department"
              name="department"
              :label="t('action.form.department')"
              :placeholder="t('action.form.departmentPlaceholder')"
              :modelValue="form.department"
            />
          </div>

          <!-- Municipality -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="municipality"
              name="municipality"
              :label="t('action.form.municipality')"
              :placeholder="t('action.form.municipalityPlaceholder')"
              :modelValue="form.municipality"
            />
          </div>

          <!-- Program -->
          <!-- <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="program"
              name="program"
              :label="t('action.form.program')"
              :placeholder="t('action.form.programPlaceholder')"
              :modelValue="form.program"
            />
          </div> -->

          <!-- Project -->
          <!-- <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="project"
              name="project"
              :label="t('action.form.project')"
              :placeholder="t('action.form.projectPlaceholder')"
              :modelValue="form.project"
            />
          </div> -->

          <!-- Activity -->
          <!-- <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="activity"
              name="activity"
              :label="t('action.form.activity')"
              :placeholder="t('action.form.activityPlaceholder')"
              :modelValue="form.activity"
            />
          </div> -->
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('action.sections.beneficiaryInformation') }}
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
              {{ t('action.beneficiaries.noBeneficiaries') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('action.sections.stakeholderInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <div v-if="form.stakeholders?.length">
              <div class="flex flex-wrap gap-2">
                <TagBadge
                  v-for="(stakeholder, index) in form.stakeholders"
                  :key="index"
                  :label="stakeholder.name"
                  customClass="bg-primary-100 text-primary-800 font-medium"
                />
              </div>
            </div>
            <div v-else class="text-red-500 text-sm mt-2">
              {{ t('action.stakeholders.noStakeholders') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('action.sections.fundingSourcesInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-200">
            <thead class="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th class="p-2 border text-left w-[50%]">
                  {{ t('action.fundingSources.name') }}
                </th>
                <th class="p-2 border text-left w-[20%]">
                  {{ t('action.fundingSources.plannedAmount') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!form.funding_sources?.length">
                <td colspan="3" class="text-center text-red-500 py-4 border">
                  {{ t('action.fundingSources.noFundingSources') }}
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
                  {{ t('action.fundingSources.plannedBudget') }}
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
          {{ t('action.sections.descriptiveCharacteristics') }}
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
              :label="t('action.form.description')"
              :placeholder="t('action.form.descriptionPlaceholder')"
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
              :label="t('action.form.prerequisites')"
              :placeholder="t('action.form.prerequisitesPlaceholder')"
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
              :label="t('action.form.impacts')"
              :placeholder="t('action.form.impactsPlaceholder')"
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
              :label="t('action.form.risks')"
              :placeholder="t('action.form.risksPlaceholder')"
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
import { useActionStore, useSettingsCurrencyStore } from '@/store';
import TagBadge from '../TagBadge.vue';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';

const store = useActionStore();
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
  