<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <!-- Breadcrumbs -->
      <Breadcrumbs
        :breadcrumbs="breadcrumbs"
        :pageTitle="t('structureMatrixPeriod.list.breadTitle')"
      />

      <!-- Action buttons -->
      <div class="flex justify-end mt-4 mb-4 gap-4">
        <Button
          v-if="selectedRows.length > 0"
          :icon="Trash"
          variant="danger-outline"
          customClass="sm:px-4"
          @click="() => deleteRows(selectedRows)"
        >
          {{ t('common.buttons.delete') }} ({{ selectedRows.length }})
        </Button>

        <LinkButton
          :to="{ name: 'structure-matrix-period-create' }"
          :icon="Plus"
          variant="primary"
          customClass="sm:px-4"
        >
          {{ t('structureMatrixPeriod.btnAdd') }}
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
        :data="store.structureMatrixPeriods"
        :meta="store.meta"
        @pagination-change="onPageChange"
        @sorting-change="onSortChange"
        @row-selection-change="onRowSelectionChange"
        :resetSelectionKey="resetSelectionKey"
      />
    </PageStateWrapper>
  </DefaultLayout>
</template>
  
  <script setup>
import { Plus, Trash } from 'lucide-vue-next';

import { useStructureMatrixPeriodStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useDatatable } from '@/composables/useDatatable';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import DatatableSearchInput from '@/components/ui/DatatableSearchInput.vue';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { getColumns } from './components/DataTableColumns';

const { t } = useI18n();
const router = useRouter();
const store = useStructureMatrixPeriodStore();

const breadcrumbs = [
  {
    title: 'sidebar.dashboard',
    disabled: false,
    to: '/',
  },
  {
    title: 'sidebar.structureMatrixPeriods',
    disabled: true,
    to: null,
  },
  {
    title: 'structureMatrixPeriod.list.breadActive',
    disabled: true,
    to: {
      name: 'structure-matrix-period',
    },
  },
];

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
} = useDatatable(store.getAll, { id: 'id', desc: true }, store);

const { isLoading, hasError, errorMessage, fetchData: fetchWithState } = usePageState(fetchData);

const columns = getColumns({
  t,
  onView: (id) => router.push({ name: 'structure-matrix-period-show', params: { id } }),
  onEdit: (id) => router.push({ name: 'structure-matrix-period-edit', params: { id } }),
  onDelete: (ids) => deleteRows(ids),
});

const resetPageAndRefresh = async (clearSearch = false) => {
  if (clearSearch) searchTerm.value = null;
  store.resetServerParams();
  pagination.value.pageIndex = store.meta.current_page - 1;
  pagination.value.pageSize = store.meta.per_page;
  await fetchData();
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
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};

onBeforeMount(() => resetPageAndRefresh(true));
onMounted(fetchWithState);
</script>
  