<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg" v-if="context === 'edit'">
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
          <div
            class="col-span-12 md:col-span-6 lg:col-span-4"
            v-if="form.author && context !== 'copy'"
          >
            <InputReadonly
              id="author"
              name="author"
              :label="t('common.form.author')"
              :model-value="form.author"
            />
          </div>

          <!-- Reference -->
          <div
            v-if="form.reference && context !== 'copy'"
            class="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('action.form.reference')"
              :placeholder="t('action.form.reference')"
              :modelValue="form.reference"
              readonly
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="name"
              name="name"
              :label="t('action.form.name')"
              v-model="form.name"
              :placeholder="t('action.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <!-- Structure -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="structure"
              name="structure"
              v-model="form.structure"
              @update:modelValue="onChangeStructure"
              :label="t('action.form.structure')"
              :options="operationalStructures"
              :placeholder="t('action.form.structurePlaceholder')"
              :error="form.errors.get('structure')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
          </div>

          <!-- Action plan -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="action_plan"
              name="action_plan"
              :label="t('action.form.actionPlan')"
              v-model="form.action_plan"
              :options="actionPlansFiltered"
              :placeholder="t('action.form.actionPlanPlaceholder')"
              :error="form.errors.get('action_plan')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
          </div>

          <!-- Priority level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="priority"
              name="priority"
              v-model="form.priority"
              :label="t(`action.form.priority`)"
              :options="store.priorityLevels"
              :placeholder="t(`action.form.priorityPlaceholder`)"
              :error="form.errors.get('priority')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="code"
              label-key="name"
              required
            />
          </div>

          <!-- Risk level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="risk_level"
              name="risk_level"
              v-model="form.risk_level"
              :label="t(`action.form.riskLevel`)"
              :options="store.riskLevels"
              :placeholder="t(`action.form.riskLevel`)"
              :error="form.errors.get('risk_level')"
              clearable
              filterable
              value-key="code"
              label-key="name"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              required
            />
          </div>

          <!-- Project owner -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="project_owner"
              name="project_owner"
              v-model="form.project_owner"
              :label="t('action.form.projectOwner')"
              :options="projectOwnersFiltered"
              @update:modelValue="onChangeProjectOwner"
              :placeholder="t('action.form.projectOwnerPlaceholder')"
              :error="form.errors.get('project_owner')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
          </div>

          <!-- Delegated project owner -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="delegated_project_owner"
              name="delegated_project_owner"
              v-model="form.delegated_project_owner"
              :label="t('action.form.delegatedProjectOwner')"
              :options="delegatedProjectOwnersFiltered"
              :placeholder="t('action.form.delegatedProjectOwnerPlaceholder')"
              :error="form.errors.get('delegated_project_owner')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
          </div>

          <!-- Generate document type -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="generate_document_type"
              name="generate_document_type"
              v-model="form.generate_document_type"
              :label="t('action.form.generateDocumentType')"
              :options="store.generateDocumentTypes"
              :placeholder="t('action.form.generateDocumentTypePlaceholder')"
              :error="form.errors.get('generate_document_type')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="code"
              label-key="name"
              required
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
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="context === 'edit'">
            <StatusField
              :status="form.state"
              :label="t('common.form.state')"
              :placeholder="t('common.form.state')"
              display-key="label"
            />
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="context !== 'create'">
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

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('action.sections.level4') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Action Domain -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="action_domain"
              name="action_domain"
              v-model="form.action_domain"
              :label="t('action.form.actionDomain')"
              :options="store.actionDomains"
              @update:modelValue="onChangeActionDomain"
              :placeholder="t('action.form.actionDomainPlaceholder')"
              :error="form.errors.get('action_domain')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
            />
          </div>

          <!-- Strategic Domain -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="strategic_domain"
              name="strategic_domain"
              v-model="form.strategic_domain"
              :label="t('action.form.strategicDomain')"
              :options="strategicDomainsFiltered"
              @update:modelValue="onChangeStrategicDomain"
              :placeholder="t('action.form.strategicDomainPlaceholder')"
              :error="form.errors.get('strategic_domain')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
            />
          </div>

          <!-- Capability Domain -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="capability_domain"
              name="capability_domain"
              v-model="form.capability_domain"
              :label="t('action.form.capabilityDomain')"
              :options="capabilityDomainsFiltered"
              @update:modelValue="onChangeCapabilityDomain"
              :placeholder="t('action.form.capabilityDomainPlaceholder')"
              :error="form.errors.get('capability_domain')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
            />
          </div>

          <!-- Elementary Level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="elementary_level"
              name="elementary_level"
              v-model="form.elementary_level"
              :label="t('action.form.elementaryLevel')"
              :options="elementaryLevelsFiltered"
              :placeholder="t('action.form.elementaryLevelPlaceholder')"
              :error="form.errors.get('elementary_level')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
            />
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
            <SingleSelect
              id="responsible_structure"
              name="responsible_structure"
              v-model="form.responsible_structure"
              :label="t('action.form.responsibleStructure')"
              :options="responsibleStructuresFiltered"
              @update:modelValue="onChangeResponsibleStructure"
              :placeholder="t('action.form.responsibleStructurePlaceholder')"
              :error="form.errors.get('responsible_structure')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
            />
          </div>

          <!-- Responsible User -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              id="responsible"
              name="responsible"
              v-model="form.responsible"
              :label="t('action.form.responsible')"
              :options="responsibleUsersFiltered"
              :placeholder="t('action.form.responsiblePlaceholder')"
              :error="form.errors.get('responsible')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
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
            <SingleSelect
              id="region"
              name="region"
              v-model="form.region"
              :label="t('action.form.region')"
              :options="store.regions"
              @update:modelValue="onChangeRegion"
              :placeholder="t('action.form.regionPlaceholder')"
              :error="form.errors.get('region')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
            />
          </div>

          <!-- Department -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="department"
              name="department"
              v-model="form.department"
              :label="t('action.form.department')"
              :options="departmentsFiltered"
              @update:modelValue="onChangeDepartment"
              :placeholder="t('action.form.departmentPlaceholder')"
              :error="form.errors.get('department')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
            />
          </div>

          <!-- Municipality -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="municipality"
              name="municipality"
              v-model="form.municipality"
              :label="t('action.form.municipality')"
              :options="municipalitiesFiltered"
              :placeholder="t('action.form.municipalityPlaceholder')"
              :error="form.errors.get('municipality')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
            />
          </div>
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
                  :key="beneficiary.uuid || index"
                  :label="beneficiary.name"
                  removable
                  @remove="form.beneficiaries.splice(index, 1)"
                  customClass="bg-green-100 text-green-800 font-medium"
                />
              </div>
            </div>
            <div v-else class="text-red-500 text-sm mt-2">
              {{ t('action.beneficiaries.noBeneficiaries') }}
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            type="button"
            class="text-sm text-primary-600 hover:underline hover:text-primary-700 font-medium"
            @click="openBeneficiaryModal"
          >
            {{ t('action.beneficiaries.addBeneficiary') }}
          </button>
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
                  :key="stakeholder.uuid || index"
                  :label="stakeholder.name"
                  removable
                  @remove="form.stakeholders.splice(index, 1)"
                  customClass="bg-primary-100 text-primary-800 font-medium"
                />
              </div>
            </div>
            <div v-else class="text-red-500 text-sm mt-2">
              {{ t('action.stakeholders.noStakeholders') }}
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            type="button"
            class="text-sm text-primary-600 hover:underline hover:text-primary-700 font-medium"
            @click="openStakeholderModal"
          >
            {{ t('action.stakeholders.addStakeholder') }}
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
          {{ t('action.sections.fundingSourcesInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>

      <div class="w-full mx-auto bg-white rounded-lg">
        <div class="card-body p-4 flex items-center justify-center">
          <SearchInput
            v-model:search="localSearch"
            mode="local"
            show-all-on-focus
            :options="fundingSourcesFiltered"
            :placeholder="t('action.fundingSources.searchPlaceholder')"
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
                      {{ t('action.fundingSources.name') }}
                    </th>
                    <th class="p-2 border text-left w-[20%]">
                      {{ t('action.fundingSources.plannedAmount') }}
                    </th>
                    <th class="p-2 border text-center w-[60px]">
                      {{ t('common.table.actions') }}
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
                    :key="source.uuid || index"
                    class="bg-white even:bg-gray-50"
                  >
                    <td class="p-2 border">{{ source.name }}</td>
                    <td class="p-2 border">
                      <input
                        type="text"
                        v-model="source.planned_amount"
                        :placeholder="t('action.fundingSources.plannedAmount')"
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
                      {{ t('action.fundingSources.plannedBudget') }}
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
          {{ t('action.sections.descriptiveCharacteristics') }}
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
              :label="t('action.form.description')"
              :placeholder="t('action.form.descriptionPlaceholder')"
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
              :label="t('action.form.prerequisites')"
              :placeholder="t('action.form.prerequisitesPlaceholder')"
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
              :label="t('action.form.impacts')"
              :placeholder="t('action.form.impactsPlaceholder')"
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
              :label="t('action.form.risks')"
              :placeholder="t('action.form.risksPlaceholder')"
              :error="form.errors.get('risks')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
    <BeneficiariesPickerModal ref="modalBeneficiary" @onSelect="handleBeneficiariesSelect" />
    <StakeholdersPickerModal ref="modalStakeholder" @onSelect="handleStakeholdersSelect" />
  </div>
</template>
  
  <script setup>
import { useActionStore, useSettingsCurrencyStore, useAlertStore } from '@/store';
import SearchInput from '@/components/ui/SearchInput.vue';
import TagBadge from '../TagBadge.vue';
import BeneficiariesPickerModal from '../BeneficiariesPickerModal.vue';
import StakeholdersPickerModal from '../StakeholdersPickerModal.vue';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import { Trash2 } from 'lucide-vue-next';

const store = useActionStore();
const alertStore = useAlertStore();

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const departmentsFiltered = ref([]);
const municipalitiesFiltered = ref([]);

const strategicDomainsFiltered = ref([]);
const capabilityDomainsFiltered = ref([]);
const elementaryLevelsFiltered = ref([]);

const actionPlansFiltered = ref([]);
const projectOwnersFiltered = ref([]);
const delegatedProjectOwnersFiltered = ref([]);

const responsibleStructuresFiltered = ref([]);
const responsibleUsersFiltered = ref([]);

const modalBeneficiary = ref(null);
const modalStakeholder = ref(null);
const localSearch = ref('');

const form = store.form;

const currencyStore = useSettingsCurrencyStore();
const { formatCurrency } = useCurrencyFormatter();

const currentCurrencyCode = computed(() => {
  return store.defaultCurrency?.code || currencyStore.defaultCurrency?.code;
});

const operationalStructures = computed(() => {
  return store.structures.filter((s) => s.type === 'OPERATIONAL');
});

const getAncestorStructureUuids = (uuid) => {
  const parent = store.structures.find((s) => s.uuid === uuid)?.parent_uuid;
  if (!parent) return [];
  return [parent, ...getAncestorStructureUuids(parent)];
};

const getDescendantStructureUuids = (uuid) => {
  const children = store.structures.filter((s) => s.parent_uuid === uuid).map((s) => s.uuid);

  if (!children.length) return [];

  const nested = children.flatMap((child) => getDescendantStructureUuids(child));
  return [...children, ...nested];
};

const fundingSourcesFiltered = computed(() => {
  if (!form.structure) return [];

  const parents = getAncestorStructureUuids(form.structure);
  const allowed = [form.structure, ...parents];

  return store.fundingSources.filter(
    (f) => allowed.includes(f.structure_uuid) || f.structure_uuid === null
  );
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

const openStakeholderModal = () => {
  if (modalStakeholder.value?.openModal) {
    modalStakeholder.value.openModal();
  }
};

const handleStakeholdersSelect = (selectedItems = []) => {
  const existingUuids = form.stakeholders.map((b) => b.uuid);

  const newStakeholders = selectedItems.filter((item) => !existingUuids.includes(item.uuid));

  form.stakeholders.push(...newStakeholders);
};

const onChangeStructure = (structureUuid, isInit = false) => {
  if (!structureUuid) {
    actionPlansFiltered.value = [];
    projectOwnersFiltered.value = [];
    delegatedProjectOwnersFiltered.value = [];
    responsibleStructuresFiltered.value = [];
    responsibleUsersFiltered.value = [];
    return;
  }

  const parents = getAncestorStructureUuids(structureUuid);
  const allowed = [structureUuid, ...parents];

  actionPlansFiltered.value = store.actionPlans.filter((plan) =>
    allowed.includes(plan.structure_uuid)
  );

  projectOwnersFiltered.value = store.projectOwners.filter(
    (p) => allowed.includes(p.structure_uuid) || p.structure_uuid === null
  );

  if (isInit && form.project_owner) {
    onChangeProjectOwner(form.project_owner, true);
  }

  const descendants = getDescendantStructureUuids(structureUuid);
  responsibleStructuresFiltered.value = store.structures.filter((s) =>
    descendants.includes(s.uuid)
  );

  if (isInit && form.responsible_structure) {
    onChangeResponsibleStructure(form.responsible_structure, true);
  }
};

const onChangeResponsibleStructure = (structureUuid, isInit = false) => {
  if (!isInit) {
    form.responsible = null;
  }

  if (!structureUuid) {
    responsibleUsersFiltered.value = [];
    return;
  }

  responsibleUsersFiltered.value = store.users.filter((u) => u.structure_uuid === structureUuid);
};

const onChangeProjectOwner = (projectOwnerUuid, isInit = false) => {
  if (!isInit) {
    form.delegated_project_owner = null;
  }

  if (!projectOwnerUuid) {
    delegatedProjectOwnersFiltered.value = [];
    return;
  }

  delegatedProjectOwnersFiltered.value = store.delegatedProjectOwners.filter(
    (dpo) => dpo.project_owner_uuid === projectOwnerUuid
  );
};

const onChangeRegion = (regionUuid, isInit = false) => {
  if (!isInit) {
    form.department = null;
    form.municipality = null;
  }

  if (!regionUuid) {
    departmentsFiltered.value = [];
    municipalitiesFiltered.value = [];
    return;
  }

  departmentsFiltered.value = store.departments.filter((dep) => dep.region_uuid === regionUuid);

  if (isInit && form.department) onChangeDepartment(form.department, true);
};

const onChangeDepartment = (departmentUuid, isInit = false) => {
  if (!isInit) form.municipality = null;

  if (!departmentUuid) {
    municipalitiesFiltered.value = [];
    return;
  }

  municipalitiesFiltered.value = store.municipalities.filter(
    (mun) => mun.department_uuid === departmentUuid
  );
};

const onChangeActionDomain = (uuid, isInit = false) => {
  if (!isInit) {
    form.strategic_domain = null;
    form.capability_domain = null;
    form.elementary_level = null;
  }

  if (!uuid) {
    strategicDomainsFiltered.value = [];
    capabilityDomainsFiltered.value = [];
    elementaryLevelsFiltered.value = [];
    return;
  }

  strategicDomainsFiltered.value = store.strategicDomains.filter(
    (p) => p.action_domain_uuid === uuid
  );

  if (isInit && form.strategic_domain) onChangeStrategicDomain(form.strategic_domain, true);
};

const onChangeStrategicDomain = (uuid, isInit = false) => {
  if (!isInit) {
    form.capability_domain = null;
    form.elementary_level = null;
  }

  if (!uuid) {
    capabilityDomainsFiltered.value = [];
    elementaryLevelsFiltered.value = [];
    return;
  }

  capabilityDomainsFiltered.value = store.capabilityDomains.filter(
    (p) => p.strategic_domain_uuid === uuid
  );

  if (isInit && form.capability_domain) onChangeCapabilityDomain(form.capability_domain, true);
};

const onChangeCapabilityDomain = (uuid, isInit = false) => {
  if (!isInit) {
    form.elementary_level = null;
  }

  if (!uuid) {
    elementaryLevelsFiltered.value = [];
    return;
  }

  elementaryLevelsFiltered.value = store.elementaryLevels.filter(
    (a) => a.capability_domain_uuid === uuid
  );
};

onMounted(async () => {
  await nextTick();

  if (!form.currency) {
    form.currency = store.defaultCurrency?.code || currencyStore.defaultCurrency?.code;
  }

  if (props.context !== 'create') {
    if (form.structure) onChangeStructure(form.structure, true);
    if (form.project_owner) onChangeProjectOwner(form.project_owner, true);
    if (form.responsible_structure) onChangeResponsibleStructure(form.responsible_structure, true);

    if (form.region) onChangeRegion(form.region, true);
    if (form.department) onChangeDepartment(form.department, true);

    if (form.action_domain) onChangeActionDomain(form.action_domain, true);
    if (form.strategic_domain) onChangeStrategicDomain(form.strategic_domain, true);
    if (form.capability_domain) onChangeCapabilityDomain(form.capability_domain, true);
  }
});
</script>
  