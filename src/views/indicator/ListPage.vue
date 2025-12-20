<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <!-- Breadcrumbs -->
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="t('indicator.list.breadTitle')" />

      <!-- Action buttons -->
      <div class="flex justify-end mt-4 mb-4 gap-4">
        <Button
          v-if="hasPermission(PERMISSIONS.DELETE_INDICATOR) && selectedRows.length > 0"
          :icon="Trash"
          variant="danger-outline"
          customClass="sm:px-4"
          @click="() => deleteRows(selectedRows)"
        >
          {{ t('common.buttons.delete') }} ({{ selectedRows.length }})
        </Button>

        <LinkButton
          v-if="hasPermission(PERMISSIONS.CREATE_INDICATOR)"
          :to="{ name: 'indicator-create' }"
          :icon="Plus"
          variant="primary"
          customClass="sm:px-4"
        >
          {{ t('indicator.btnAdd') }}
        </LinkButton>
      </div>

      <!-- Filters -->
      <FilterPanel v-model="filters" @filter="onFilter" />

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
        :data="store.indicators"
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

import { useIndicatorStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useDatatable } from '@/composables/useDatatable';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import DatatableSearchInput from '@/components/ui/DatatableSearchInput.vue';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { getColumns } from './components/DataTableColumns';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

import FilterPanel from './components/FilterPanel.vue';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useIndicatorStore();

const breadcrumbs = [
  {
    title: 'sidebar.dashboard',
    disabled: false,
    to: '/',
  },
  { title: 'sidebar.strategicManagement', disabled: true, to: null },
  {
    title: 'sidebar.indicators',
    disabled: true,
    to: null,
  },
  {
    title: 'indicator.list.breadActive',
    disabled: true,
    to: {
      name: 'indicator',
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
  onCopy: (id) => router.push({ name: 'indicator-create', params: { id } }),
  onView: (id) => router.push({ name: 'indicator-show', params: { id } }),
  onEdit: (id) => router.push({ name: 'indicator-edit', params: { id } }),
  onDelete: (ids) => deleteRows(ids),
});

const filters = ref({
  status: route.query.status ?? '',
  state: route.query.state ?? '',
  category: route.query.category ?? '',
});

const onFilter = async (activeFilters) => {
  store.setFilters(activeFilters);
  pagination.value.pageIndex = 0;
  await fetchData();
};

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
  await store.getFilters();

  const hasQueryFilters = route.query.status || route.query.state || route.query.category;

  if (hasQueryFilters) {
    store.setFilters(filters.value);
    pagination.value.pageIndex = 0;
    await fetchWithState();
    return;
  }

  await resetPageAndRefresh(true);
  await fetchWithState();
});
</script>
  