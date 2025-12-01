<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <!-- Action buttons -->
    <div class="flex justify-end mt-4 mb-4 gap-4">
      <LinkButton
        :to="{ name: 'supplier' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
      >
        {{ t('supplier.btnList') }}
      </LinkButton>

      <Button
        v-if="selectedRows.length > 0"
        :icon="Trash"
        variant="danger-outline"
        customClass="sm:px-4"
        @click="() => deleteRows(selectedRows)"
      >
        {{ t('common.buttons.delete') }} ({{ selectedRows.length }})
      </Button>

      <LinkButton :to="createRoute" :icon="Plus" variant="primary" customClass="sm:px-4">
        {{ t('contract.btnAdd') }}
      </LinkButton>
    </div>

    <!-- Search -->
    <div class="w-full md:w-1/2 relative mb-2">
      <DatatableSearchInput
        v-model="searchTerm"
        size="md"
        :placeholder="t('common.searchPlaceholder')"
        @search="onSearch"
      />
    </div>

    <!-- DataTable -->
    <DataTable
      :columns="columns"
      :data="store.contracts"
      :meta="store.meta"
      @pagination-change="onPageChange"
      @sorting-change="onSortChange"
      @row-selection-change="onRowSelectionChange"
      :resetSelectionKey="resetSelectionKey"
    />
  </PageStateWrapper>
</template>
  
  <script setup>
import { Plus, Trash } from 'lucide-vue-next';

import { useContractStore, useSettingsCurrencyStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useDatatable } from '@/composables/useDatatable';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
const { formatCurrency } = useCurrencyFormatter();

import DatatableSearchInput from '@/components/ui/DatatableSearchInput.vue';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { getColumns } from './components/DataTableColumns';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useContractStore();
const currencyStore = useSettingsCurrencyStore();

const supplierId = computed(() => route.params.id);

const createRoute = computed(() => ({
  name: route.name.replace(/contract.*/, 'contract-create'),
  params: {
    id: route.params.id,
  },
}));

const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();

const {
  searchTerm,
  selectedRows,
  resetSelectionKey,
  pagination,
  fetchData,
  onSearch,
  onPageChange,
  onSortChange,
  onRowSelectionChange,
} = useDatatable(
  (args) => store.getAll({ ...args, supplierId: supplierId.value }),
  { id: 'id', desc: true },
  store
);

const { isLoading, hasError, errorMessage, fetchData: fetchWithState } = usePageState(fetchData);

const getRouteName = (suffix) => {
  return `supplier-${route.name.includes('edit') ? 'edit' : 'show'}-${suffix}`;
};

const columns = getColumns({
  t,
  onView: (id) =>
    router.push({
      name: getRouteName('contract-show'),
      params: {
        id: route.params.id,
        contractId: id,
      },
    }),
  onEdit: (id) =>
    router.push({
      name: getRouteName('contract-edit'),
      params: {
        id: route.params.id,
        contractId: id,
      },
    }),
  onDelete: (id) => deleteRows([id]),
  formatCurrency,
  currencyCode: currencyStore.defaultCurrency?.code,
});

const resetPageAndRefresh = async (clearSearch = false) => {
  if (clearSearch) searchTerm.value = null;
  store.resetServerParams();
  pagination.value.pageIndex = store.meta.current_page - 1;
  pagination.value.pageSize = store.meta.per_page;
};

const deleteRows = async (ids) => {
  const isMultiple = Array.isArray(ids) && ids.length > 1;
  const confirmationMessage = isMultiple
    ? t('common.sweetalert.actions.confirmDeleteSelected')
    : t('common.sweetalert.actions.confirmDelete');

  const confirm = await showConfirm({ message: confirmationMessage });

  if (confirm.isConfirmed) {
    try {
      const result = await store.destroy(ids);
      showSimpleAlerte({ icon: 'success', text: result.message });
      resetSelectionKey.value++;
      selectedRows.value = [];
      await resetPageAndRefresh(true);
      await fetchData();
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};

onMounted(async () => {
  await resetPageAndRefresh(true);
  await fetchWithState();
});
</script>
  