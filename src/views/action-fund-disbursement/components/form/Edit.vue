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
          <div v-if="form.reference" class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('actionFundDisbursement.form.reference')"
              :placeholder="t('actionFundDisbursement.form.reference')"
              :modelValue="form.reference"
              readonly
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
              :label="t('actionFundDisbursement.form.action')"
              :options="store.actions"
              :placeholder="t('actionFundDisbursement.form.actionPlaceholder')"
              :error="form.errors.get('action')"
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
            <InputReadonly
              v-else
              id="action"
              name="action"
              :label="t('actionFundDisbursement.form.action')"
              :placeholder="t('actionFundDisbursement.form.actionPlaceholder')"
              :model-value="form.action?.reference"
            />
          </div>

          <!-- Phase -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="phase"
              name="phase"
              v-model="form.phase"
              @update:modelValue="onChangePhase"
              :label="t('actionFundDisbursement.form.phase')"
              :options="phases"
              :placeholder="t('actionFundDisbursement.form.phasePlaceholder')"
              :error="form.errors.get('phase')"
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

          <!-- task -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="task"
              name="task"
              v-model="form.task"
              :label="t('actionFundDisbursement.form.task')"
              :options="tasks"
              :placeholder="t('actionFundDisbursement.form.taskPlaceholder')"
              :error="form.errors.get('task')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="title"
            />
          </div>

          <!-- Budget type -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="budget_type"
              name="budget_type"
              v-model="form.budget_type"
              :label="t('actionFundDisbursement.form.budgetType')"
              :options="store.budgetTypes"
              :placeholder="t('actionFundDisbursement.form.budgetTypePlaceholder')"
              :error="form.errors.get('budget_type')"
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

          <!-- Description -->
          <div class="col-span-12">
            <Textarea
              id="description"
              name="description"
              v-model="form.description"
              :label="t('actionFundDisbursement.form.description')"
              :placeholder="t('actionFundDisbursement.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-6 mx-auto bg-white rounded-lg">
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
            <SingleSelect
              id="supplier"
              name="supplier"
              v-model="form.supplier"
              @update:modelValue="onChangeSupplier"
              :label="t('actionFundDisbursement.form.supplier')"
              :options="store.suppliers"
              :placeholder="t('actionFundDisbursement.form.supplierPlaceholder')"
              :error="form.errors.get('supplier')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="company_name"
              required
            />
          </div>

          <!-- Contract -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="contract"
              name="contract"
              v-model="form.contract"
              @update:modelValue="onChangeContract"
              :label="t('actionFundDisbursement.form.contract')"
              :options="contracts"
              :placeholder="t('actionFundDisbursement.form.contractPlaceholder')"
              :error="form.errors.get('contract')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="contract_number"
              required
            />
          </div>

          <!-- Operation number -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="operation_number"
              name="operation_number"
              :label="t('actionFundDisbursement.form.operationNumber')"
              v-model="form.operation_number"
              :placeholder="t('actionFundDisbursement.form.operationNumberPlaceholder')"
              :error="form.errors.get('operation_number')"
              :form="form"
              required
            />
          </div>

          <!-- Signature date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="signature_date"
              name="signature_date"
              v-model="form.signature_date"
              :label="t('actionFundDisbursement.form.signatureDate')"
              :placeholder="t('actionFundDisbursement.form.signatureDatePlaceholder')"
              :error="form.errors.get('signature_date')"
              required
            />
          </div>

          <!-- execution date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="execution_date"
              name="execution_date"
              v-model="form.execution_date"
              :label="t('actionFundDisbursement.form.executionDate')"
              :placeholder="t('actionFundDisbursement.form.executionDatePlaceholder')"
              :error="form.errors.get('execution_date')"
              required
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

        <div class="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
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
          <button
            type="button"
            @click.prevent.stop="clearFile"
            class="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
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
            <SingleSelect
              id="payment_mode"
              name="payment_mode"
              v-model="form.payment_mode"
              :label="t('actionFundDisbursement.form.paymentMode')"
              :options="store.paymentModes"
              :placeholder="t('actionFundDisbursement.form.paymentModePlaceholder')"
              :error="form.errors.get('payment_mode')"
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

          <!-- Payment amount -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="payment_amount"
              name="payment_amount"
              :label="
                currentCurrencyCode
                  ? `${t('actionFundDisbursement.form.paymentAmount')} (${currentCurrencyCode})`
                  : t('actionFundDisbursement.form.paymentAmount')
              "
              v-model="form.payment_amount"
              :placeholder="t('actionFundDisbursement.form.paymentAmountPlaceholder')"
              :error="form.errors.get('payment_amount')"
              :form="form"
              required
            />
          </div>

          <!-- Payment date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="payment_date"
              name="payment_date"
              v-model="form.payment_date"
              :label="t('actionFundDisbursement.form.paymentDate')"
              :placeholder="t('actionFundDisbursement.form.paymentDatePlaceholder')"
              :error="form.errors.get('payment_date')"
              required
            />
          </div>

          <!-- Cheque reference -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="cheque_reference"
              name="cheque_reference"
              :label="t('actionFundDisbursement.form.chequeReference')"
              v-model="form.cheque_reference"
              :placeholder="t('actionFundDisbursement.form.chequeReferencePlaceholder')"
              :error="form.errors.get('cheque_reference')"
              :form="form"
              required
            />
          </div>

          <!-- File Upload -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <label for="file" class="mb-1 block text-sm font-medium text-gray-700">
              {{ t('attachment.form.file') }}
            </label>

            <div class="relative">
              <input
                id="file"
                ref="fileInput"
                type="file"
                class="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                @change="onChangeFile"
              />

              <div
                class="w-full py-2.5 px-3 rounded-lg text-sm text-gray-800 bg-white border cursor-pointer flex items-center justify-between border-gray-300 focus-within:border-primary-300 focus-within:ring-1 focus-within:ring-primary-500/10"
                @click="triggerFileSelection"
              >
                <span class="truncate text-gray-500">
                  {{ form.file ? form.file.name : t('attachment.form.filePlaceholder') }}
                </span>

                <Upload v-if="!form.file" class="w-5 h-5 text-gray-400" />

                <button
                  type="button"
                  v-if="form.file"
                  @click.prevent.stop="clearFile"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>
            </div>

            <p v-if="form.errors.get('file')" class="text-red-500 text-xs mt-1">
              {{ form.errors.get('file') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto bg-white shadow-sm rounded-lg my-6">
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
                  :key="expenseType.uuid || index"
                  :label="expenseType.name"
                  removable
                  @remove="form.expense_types.splice(index, 1)"
                  customClass="bg-green-100 text-green-800 font-medium"
                />
              </div>
            </div>
            <div v-else class="text-red-500 text-sm mt-2">
              {{ t('actionFundDisbursement.expenseTypes.noExpenseTypes') }}
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            type="button"
            class="text-sm text-primary-600 hover:underline hover:text-primary-700 font-medium"
            @click="openExpenseTypeModal"
          >
            {{ t('actionFundDisbursement.expenseTypes.addExpenseType') }}
          </button>
        </div>
      </div>
    </div>

    <ExpenseTypesPickerModal ref="modalExpenseType" @onSelect="handleExpenseTypesSelect" />
  </div>
</template>
  
  <script setup>
import { useActionFundDisbursementStore } from '@/store';
import TagBadge from '../TagBadge.vue';
import ExpenseTypesPickerModal from '../ExpenseTypesPickerModal.vue';
import { FileText, Upload, X } from 'lucide-vue-next';

const store = useActionFundDisbursementStore();

const phases = ref([]);
const tasks = ref([]);
const contracts = ref([]);
const modalExpenseType = ref(null);

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});
const form = store.form;
const fileInput = ref(null);

const openExpenseTypeModal = () => {
  if (modalExpenseType.value?.openModal) {
    modalExpenseType.value.openModal();
  }
};

const handleExpenseTypesSelect = (selectedItems) => {
  const existingUuids = form.expense_types.map((b) => b.uuid);

  const newExpenseTypes = selectedItems.filter((item) => !existingUuids.includes(item.uuid));

  form.expense_types.push(...newExpenseTypes);
};

const currentCurrencyCode = computed(() => {
  const selectedAction =
    props.context === 'create' ? store.actions.find((a) => a.uuid === form.action) : form.action;

  return selectedAction?.currency || null;
});

const onChangeAction = (actionUuid, isInit = false) => {
  if (!actionUuid) {
    phases.value = [];
    tasks.value = [];
    form.phase = null;
    form.task = null;
    return;
  }

  const selectedAction =
    props.context === 'create' ? store.actions.find((a) => a.uuid === actionUuid) : form.action;

  phases.value = selectedAction?.phases || [];

  if (!isInit) {
    form.phase = null;
    form.task = null;
    tasks.value = [];
  }

  if (!isInit) {
    form.supplier = null;
    form.contract = null;
    contracts.value = [];
  }
};

const onChangePhase = (phaseUuid, isInit = false) => {
  if (!phaseUuid) {
    tasks.value = [];
    form.task = null;
    return;
  }

  const selectedPhase = phases.value.find((p) => p.uuid === phaseUuid);
  tasks.value = selectedPhase?.tasks || [];

  if (!isInit) form.task = null;
};

const onChangeSupplier = (supplierUuid, isInit = false) => {
  if (!supplierUuid) {
    contracts.value = [];
    form.contract = null;
    return;
  }

  const selectedSupplier = store.suppliers.find((s) => s.uuid === supplierUuid);
  contracts.value = selectedSupplier?.contracts || [];

  if (!isInit) form.contract = null;
};

const onChangeContract = (contractUuid, isInit = false) => {
  if (!contractUuid) {
    form.signature_date = null;
    return;
  }

  const selectedContract = contracts.value.find((c) => c.uuid === contractUuid);

  if (selectedContract?.signed_at) {
    form.signature_date = selectedContract.signed_at;
  }
};

const triggerFileSelection = () => {
  fileInput.value.click();
};

const onChangeFile = (event) => {
  form.file = event.target.files[0];
  form.delete_file = false;
};

const clearFile = () => {
  form.file = null;
  form.attachment = null;
  form.delete_file = true;
};

onMounted(async () => {
  await nextTick();

  if (props.context !== 'create') {
    if (form.action) onChangeAction(form.action?.uuid || form.action, true);
    if (form.phase) onChangePhase(form.phase?.uuid || form.phase, true);
    if (form.supplier) onChangeSupplier(form.supplier?.uuid || form.supplier, true);
  }
});
</script>
  