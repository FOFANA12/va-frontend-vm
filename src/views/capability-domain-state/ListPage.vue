<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <!-- Action buttons -->
    <div class="flex justify-end mt-4 mb-6 gap-4">
      <LinkButton
        :to="{ name: 'capabilityDomain' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('capabilityDomain.btnList') }}
      </LinkButton>

      <Button :icon="Plus" variant="primary" customClass="sm:px-4" @click="openStateModal">
        {{ t('capabilityDomainState.btnAdd') }}
      </Button>
    </div>

    <!-- Add table here -->
    <div class="w-full bg-white mx-auto rounded-lg mb-4 overflow-hidden">
      <table class="min-w-full table-auto border-collapse">
        <thead class="bg-white text-gray-700">
          <tr>
            <th class="w-2/5 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('capabilityDomainState.table.date') }}
            </th>
            <th class="w-2/5 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('common.table.status.label') }}
            </th>
            <th class="w-1/5 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('common.author') }}
            </th>
            <th class="px-4 py-1.5 border-b border-gray-300 text-center w-[120px]">
              {{ t('common.table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!capabilityDomainStateStore.states || capabilityDomainStateStore.states.length === 0">
            <td colspan="4" class="bg-white text-center py-4 text-gray-500 border border-gray-100">
              {{ t('capabilityDomainState.table.noData') }}
            </td>
          </tr>
          <tr
            v-for="item in capabilityDomainStateStore.states"
            :key="item.uuid"
            class="bg-white hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.state_date }}
            </td>
            <td class="px-4 py-2 border-t border-gray-200">
              <StatusBadge :status="item.state" />
            </td>
            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.author }}
            </td>
            <td class="px-4 py-2 border-t border-gray-200 text-center">
              <button
                v-if="capabilityDomainStateStore.states.length > 1"
                type="button"
                class="text-red-500 hover:text-red-700 transition"
                @click.stop.prevent="deleteRows([item.id])"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <StateModal ref="stateModal" @success="handleSuccess" />
  </PageStateWrapper>
</template>
  
  <script setup>
import { Plus, Trash, TrashIcon } from 'lucide-vue-next';
import { useCapabilityDomainStateStore, useCapabilityDomainStore } from '@/store';
import StatusBadge from '@/components/ui/StatusBadge.vue';

import { usePageState } from '@/composables/usePageState';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import StateModal from './components/StateModal.vue';

const { t } = useI18n();
const route = useRoute();
const capabilityDomainStateStore = useCapabilityDomainStateStore();
const capabilityDomainStore = useCapabilityDomainStore();
const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();
const stateModal = ref(null);

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  await capabilityDomainStateStore.getAll(route.params.id);
});

const openStateModal = () => {
  stateModal.value?.openStateModal(route.params.id);
};

const handleSuccess = async (result) => {
  await fetchWithState();
  showSimpleAlerte({ icon: 'success', text: result.message });
};

const deleteRows = async (ids) => {
  const isMultiple = Array.isArray(ids) && ids.length > 1;
  const confirmationMessage = isMultiple
    ? t('common.sweetalert.actions.confirmDeleteSelected')
    : t('common.sweetalert.actions.confirmDelete');

  const confirm = await showConfirm({ message: confirmationMessage });

  if (confirm.isConfirmed) {
    try {
      const result = await capabilityDomainStateStore.destroy(ids, route.params.id);
      showSimpleAlerte({ icon: 'success', text: result.message });

      capabilityDomainStore.form.state = result.data?.state ?? null;
      capabilityDomainStore.form.state_changed_at = result.data?.state_date ?? null;
      capabilityDomainStore.form.state_changed_by = result.data?.author ?? null;

      await fetchWithState();
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};

onMounted(async () => {
  await fetchWithState();
});
</script>
  