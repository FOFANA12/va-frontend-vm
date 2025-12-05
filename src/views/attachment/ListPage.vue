<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <!-- Action buttons -->
    <div class="flex justify-end mt-4 mb-4 gap-4">
      <Button
        v-if="canManage && selectedRows.length > 0"
        :icon="Trash"
        variant="danger-outline"
        customClass="sm:px-4"
        @click="() => deleteRows(selectedRows)"
      >
        {{ t('common.buttons.delete') }} ({{ selectedRows.length }})
      </Button>

      <slot name="return-list-btn" />

      <Button
        v-if="canManage"
        :icon="Plus"
        variant="primary"
        customClass="sm:px-4"
        @click="openUploadModal"
      >
        {{ t('attachment.btnAdd') }}
      </Button>
    </div>

    <!-- Filters -->
    <FilterPanel v-model="filters" @filter="onFilter" v-if="attachableType === 'actions'" />

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
      :data="store.attachments"
      :meta="store.meta"
      @pagination-change="onPageChange"
      @sorting-change="onSortChange"
      @row-selection-change="onRowSelectionChange"
      :resetSelectionKey="resetSelectionKey"
    />

    <!-- Modal -->
    <UploadModal ref="uploadModal" @success="handleSuccess" />
    <ViewModal ref="viewModal" />
  </PageStateWrapper>
</template>
  
  <script setup>
import { Plus, Trash } from 'lucide-vue-next';
import { useAttachmentStore } from '@/store';

import { usePageState } from '@/composables/usePageState';
import { useDatatable } from '@/composables/useDatatable';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import DatatableSearchInput from '@/components/ui/DatatableSearchInput.vue';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import UploadModal from './components/UploadModal.vue';
import ViewModal from './components/ViewModal.vue';
import { getColumns } from './components/DataTableColumns';
import FilterPanel from './components/FilterPanel.vue';

import { usePermission } from '@/composables/usePermissions';
const { hasPermission } = usePermission();

const props = defineProps({
  attachableType: {
    type: String,
    required: true,
    default: null,
  },
  attachableId: {
    type: String,
    required: true,
    default: null,
  },
  permissions: {
    type: Object,
    required: true,
    validator: (p) => p.access && p.manage,
  },
});

const canAccess = computed(() => hasPermission(props.permissions.access));
const canManage = computed(() => hasPermission(props.permissions.manage));
console.log("canManage ?", canManage.value);
console.log("User permissions:", usePermission().permissions);

const { t } = useI18n();
const store = useAttachmentStore();
const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();
const uploadModal = ref(null);
const viewModal = ref(null);

const filters = ref({
  filterFileType: '',
});

const fetchAttachments = async (params = {}) => {
  return store.getAll({
    ...params,
    attachableType: props.attachableType,
    attachableId: props.attachableId,
  });
};

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
} = useDatatable(fetchAttachments, { id: 'id', desc: true }, store);

const { isLoading, hasError, errorMessage, fetchData: fetchWithState } = usePageState(fetchData);

const columns = getColumns({
  t,
  onView: (id) => openViewModal(id),
  onDelete: (ids) => deleteRows(ids),
  attachableType: props.attachableType,
  canAccess,
  canManage
});

const openUploadModal = () => uploadModal.value.openModal(props.attachableType, props.attachableId);
const openViewModal = (id) => viewModal.value.openModal(id);

const handleSuccess = async (result) => {
  await fetchAttachments();
  showSimpleAlerte({ icon: 'success', text: result.message });
};

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
  if (props.attachableType === 'actions') {
    await store.getFilters();
  }
  await resetPageAndRefresh(true);
  await fetchWithState();
});
</script>
  