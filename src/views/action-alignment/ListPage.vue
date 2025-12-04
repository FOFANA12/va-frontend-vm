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
        :to="{ name: 'action' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
      >
        {{ t('action.btnList') }}
      </LinkButton>

      <Button
        v-if="hasPermission(PERMISSIONS.ACT_MANAGE_ALIGNMENT) && selectedRows.length > 0"
        :icon="Trash"
        variant="danger-outline"
        customClass="sm:px-4"
        @click="() => unalign(selectedRows)"
      >
        {{ t('common.buttons.delete') }} ({{ selectedRows.length }})
      </Button>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.ACT_MANAGE_ALIGNMENT) && actionStore.form.is_planned"
        :to="alignmentRoute"
        :icon="Plus"
        variant="primary"
        customClass="sm:px-4"
      >
        {{ t('alignment.btnAlign') }}
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
      :data="store.alignments"
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

import { useActionStore, useActionAlignmentStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useDatatable } from '@/composables/useDatatable';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { getColumns } from './components/DataTableColumns';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useActionAlignmentStore();
const actionStore = useActionStore();

const alignmentRoute = computed(() => {
  return {
    name: route.name.replace(/alignment.*/, 'alignment-create'),
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
  (args) => store.getAll({ ...args, actionId: route.params.id }),
  { id: 'id', desc: true },
  store
);

const { isLoading, hasError, errorMessage, fetchData: fetchWithState } = usePageState(fetchData);

const columns = getColumns({
  t,
  onView: (id) => {
    const url = router.resolve({
      name: 'strategicObjective-show',
      params: { id },
    }).href;
    window.open(url, '_blank');
  },
  onUnalign: (ids) => unalign(ids),
});

const resetPageAndRefresh = async (clearSearch = false) => {
  if (clearSearch) searchTerm.value = null;
  store.resetServerParams();
  pagination.value.pageIndex = store.meta.current_page - 1;
  pagination.value.pageSize = store.meta.per_page;
};

const unalign = async (ids) => {
  const isMultiple = Array.isArray(ids) && ids.length > 1;
  const confirmationMessage = isMultiple
    ? t('alignment.sweetalert.confirmUnalignSelected')
    : t('alignment.sweetalert.confirmUnalign');

  const confirmButtonText = t('alignment.sweetalert.confirmButtonText');

  const confirm = await showConfirm({
    message: confirmationMessage,
    confirmButtonText: confirmButtonText,
  });

  if (confirm.isConfirmed) {
    try {
      const result = await store.unalign(ids);
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
  