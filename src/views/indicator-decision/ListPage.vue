<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <!-- Indicator buttons -->
    <div class="flex justify-end mt-4 mb-4 gap-4">
      <LinkButton
        :to="{ name: 'indicator' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
      >
        {{ t('indicator.btnList') }}
      </LinkButton>

      <Button
        v-if="hasPermission(PERMISSIONS.IND_MANAGE_DECISIONS) && canManageAllowed && selectedRows.length > 0"
        :icon="Trash"
        variant="danger-outline"
        customClass="sm:px-4"
        @click="() => deleteRows(selectedRows)"
      >
        {{ t('common.buttons.delete') }} ({{ selectedRows.length }})
      </Button>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.IND_MANAGE_DECISIONS) && canCreateAllowed"
        :to="createRoute"
        :icon="Plus"
        variant="primary"
        customClass="sm:px-4"
      >
        {{ t('decision.btnAdd') }}
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
      :data="decisiontStore.decisions"
      :meta="decisiontStore.meta"
      @pagination-change="onPageChange"
      @sorting-change="onSortChange"
      @row-selection-change="onRowSelectionChange"
      :resetSelectionKey="resetSelectionKey"
    />
  </PageStateWrapper>
</template>
  
  <script setup>
import { Plus, Trash } from 'lucide-vue-next';

import { useDecisionStore, useIndicatorStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useDatatable } from '@/composables/useDatatable';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { getColumns } from './components/DataTableColumns';

import { useIndicatorRules } from '@/composables/useIndicatorRules';
import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';

const { canCreateDecision, canManageDecision } = useIndicatorRules();
const { hasPermission } = usePermission();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const indicatorStore = useIndicatorStore();
const decisiontStore = useDecisionStore();

const indicator = computed(() => indicatorStore.form);
const indicatorStatus = computed(() => indicator.value?.status);
const canCreateAllowed = computed(() => canCreateDecision(indicatorStatus.value));
const canManageAllowed = computed(() => canManageDecision(indicatorStatus.value));

const createRoute = computed(() => {
  return {
    name: route.name.replace(/decision.*/, 'decision-create'),
    params: { id: route.params.id },
  };
});

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
  (args) => decisiontStore.getAll({ ...args, decidableType: 'indicators', decidableId: route.params.id }),
  { id: 'id', desc: true },
  decisiontStore
);

const { isLoading, hasError, errorMessage, fetchData: fetchWithState } = usePageState(fetchData);

const getRouteName = (suffix) => {
  return `indicator-${route.name.includes('edit') ? 'edit' : 'show'}-${suffix}`;
};

const columns = getColumns({
  t,
  onView: (id) =>
    router.push({
      name: getRouteName('decision-show'),
      params: {
        id: route.params.id,
        decisionId: id,
      },
    }),
  onEdit: (id) =>
    router.push({
      name: getRouteName('decision-edit'),
      params: {
        id: route.params.id,
        decisionId: id,
      },
    }),
  onDelete: (id) => deleteRows(id),
  indicatorStatus
});

const resetPageAndRefresh = async (clearSearch = false) => {
  if (clearSearch) searchTerm.value = null;
  decisiontStore.resetServerParams();
  pagination.value.pageIndex = decisiontStore.meta.current_page - 1;
  pagination.value.pageSize = decisiontStore.meta.per_page;
};

const deleteRows = async (ids) => {
  const isMultiple = Array.isArray(ids) && ids.length > 1;
  const confirmationMessage = isMultiple
    ? t('common.sweetalert.actions.confirmDeleteSelected')
    : t('common.sweetalert.actions.confirmDelete');

  const confirm = await showConfirm({ message: confirmationMessage });

  if (confirm.isConfirmed) {
    try {
      const result = await decisiontStore.destroy(ids);
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
  