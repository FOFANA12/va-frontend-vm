<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <!-- Breadcrumbs -->
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="t('settings.role.list.breadTitle')" />

      <!-- Action buttons -->
      <div class="flex justify-end mt-4 mb-4 gap-4">
        <Button
          v-if="hasPermission(PERMISSIONS.DELETE_ROLE) && selectedRows.length > 0"
          :icon="Trash"
          variant="danger-outline"
          customClass="sm:px-4"
          @click="() => deleteRows(selectedRows)"
        >
          {{ t('common.buttons.delete') }} ({{ selectedRows.length }})
        </Button>

        <LinkButton
          v-if="hasPermission(PERMISSIONS.CREATE_ROLE)"
          :to="{ name: 'settings-role-create' }"
          :icon="Plus"
          variant="primary"
          customClass="sm:px-4"
        >
          {{ t('settings.role.btnAdd') }}
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
        :data="store.roles"
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

import { useSettingsRoleStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useDatatable } from '@/composables/useDatatable';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import DatatableSearchInput from '@/components/ui/DatatableSearchInput.vue';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { getColumns } from './components/DataTableColumns';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const { t } = useI18n();
const router = useRouter();
const store = useSettingsRoleStore();

const breadcrumbs = [
  {
    title: 'sidebar.dashboard',
    disabled: false,
    to: '/',
  },
  {
    title: 'sidebar.settings.title',
    disabled: true,
    to: null,
  },
  {
    title: 'settings.role.list.breadActive',
    disabled: true,
    to: {
      name: 'settings-role',
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
  onView: (id) => router.push({ name: 'settings-role-show', params: { id } }),
  onEdit: (id) => router.push({ name: 'settings-role-edit', params: { id } }),
  onDelete: (ids) => deleteRows([ids]),
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
  