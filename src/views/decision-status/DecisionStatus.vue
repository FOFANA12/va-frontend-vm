<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <!-- Action buttons -->
    <div class="flex justify-end mt-4 mb-4 gap-4">
      <slot name="return-list-btn" />

      <!-- <LinkButton
        :to="{ name: 'action' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
      >
          {{ t('action.btnList') }}
      </LinkButton> -->

      <Button
        v-if="selectedRows.length > 0"
        :icon="Trash"
        variant="danger-outline"
        customClass="sm:px-4"
        @click="() => deleteRows(selectedRows)"
      >
        {{ t('common.buttons.delete') }} ({{ selectedRows.length }})
      </Button>

      <Button :icon="Plus" variant="primary" customClass="sm:px-4" @click="openCreateModal">
        {{ t('decisionStatus.btnAdd') }}
      </Button>
    </div>

    <!-- DataTable -->
    <DataTable
      :columns="columns"
      :data="store.statuses"
      :meta="store.meta"
      @pagination-change="onPageChange"
      @sorting-change="onSortChange"
      @row-selection-change="onRowSelectionChange"
      :resetSelectionKey="resetSelectionKey"
    />

    <Modal ref="modal" @success="handleSuccess" />
  </PageStateWrapper>
</template>
  
  <script setup>
import { Plus, Trash } from 'lucide-vue-next';
import Modal from './components/Modal.vue';

import { useDecisionStatusStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useDatatable } from '@/composables/useDatatable';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { getColumns } from './components/DataTableColumns';

const { t } = useI18n();
const route = useRoute();
const store = useDecisionStatusStore();

const emit = defineEmits(['refreshDecision']);

const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();

const {
  searchTerm,
  selectedRows,
  resetSelectionKey,
  pagination,
  fetchData,
  onPageChange,
  onSortChange,
  onRowSelectionChange,
} = useDatatable(
  (args) => store.getAll({ ...args, decisionId: route.params.decisionId }),
  { id: 'id', desc: true },
  store
);

const { isLoading, hasError, errorMessage, fetchData: fetchWithState } = usePageState(fetchData);

const columns = getColumns({
  t,
  onView: (id) => openViewModal(id),
  onDelete: (ids) => deleteRows(ids),
});

const modal = ref(null);

const openCreateModal = () => modal.value.openCreateModal(route.params.decisionId);
const openViewModal = (id) => modal.value.openViewModal(id);

const resetPageAndRefresh = async (clearSearch = false) => {
  if (clearSearch) searchTerm.value = null;
  store.resetServerParams();
  pagination.value.pageIndex = store.meta.current_page - 1;
  pagination.value.pageSize = store.meta.per_page;
};

const handleSuccess = async (result) => {
  await resetPageAndRefresh(true);
  await fetchData();
  showSimpleAlerte({ icon: 'success', text: result.message });
  emit('refreshDecision');
};

const deleteRows = async (ids) => {
  const isMultiple = Array.isArray(ids) && ids.length > 1;
  const confirmationMessage = isMultiple
    ? t('common.sweetalert.actions.confirmDeleteSelected')
    : t('common.sweetalert.actions.confirmDelete');

  const confirm = await showConfirm({ message: confirmationMessage });

  if (confirm.isConfirmed) {
    try {
      const result = await store.destroy(route.params.decisionId, ids);
      showSimpleAlerte({ icon: 'success', text: result.message });
      resetSelectionKey.value++;
      selectedRows.value = [];
      await resetPageAndRefresh(true);
      await fetchData();
      emit('refreshDecision');
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
  