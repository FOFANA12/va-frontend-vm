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
        :to="{ name: 'action' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('action.btnList') }}
      </LinkButton>
    </div>

    <!-- Add table here -->
    <div class="w-full bg-white mx-auto rounded-lg mb-4 overflow-hidden">
      <table class="min-w-full table-auto border-collapse">
        <thead class="bg-white text-gray-700">
          <tr>
            <th class="w-2/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('actionControl.table.actionPeriod') }}
            </th>
            <th class="w-1/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('actionControl.table.forecastPercent') }}
            </th>
            <th class="w-2/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('common.table.status.label') }}
            </th>
            <th class="w-2/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('actionControl.table.controlDate') }}
            </th>
            <th class="w-1/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('actionControl.table.actualProgressPercent') }}
            </th>
            <th class="w-1/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('actionControl.table.file') }}
            </th>
            <th class="px-4 py-1.5 border-b border-gray-300 text-center w-[120px]">
              {{ t('common.table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!store.actionControls || store.actionControls.length === 0">
            <td colspan="7" class="bg-white text-center py-4 text-gray-500 border border-gray-100">
              {{ t('actionControl.noPlanningYet') }}
            </td>
          </tr>
          <tr
            v-for="(item, index) in store.actionControls"
            :key="index"
            class="bg-white hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.action_period }}
            </td>

            <td class="px-4 py-2 border-t border-gray-200">
              {{ `${item.progress_percent} %` }}
            </td>
            <td class="px-4 py-2 border-t border-gray-200">
              <StatusBadge
                :status="{
                  label: item.id
                    ? t('actionControl.table.status.control')
                    : t('actionControl.table.status.noControl'),
                  color: item.id ? '#22c55e' : '#f59e0b',
                }"
              />
            </td>

            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.control_date ? `${item.control_date}` : '-' }}
            </td>

            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.actual_progress_percent ? `${item.actual_progress_percent} %` : '-' }}
            </td>

            <td class="px-4 py-2 border-t border-gray-200">
              <template v-if="item.download_url">
                <a
                  :href="item.download_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1 text-primary-600 hover:underline"
                >
                  <FileDown size="16" />
                  <span class="text-sm">{{ t('common.table.file.download') }}</span>
                </a>
              </template>
              <template v-else>
                <span class="text-gray-400">-</span>
              </template>
            </td>
            <td class="px-4 py-2 border-t border-gray-200 text-center">
              <div class="flex justify-center gap-2">
                <button
                  v-if="!item.id && currentPeriod(item.period_id) && hasPermission(PERMISSIONS.ACT_MANAGE_CONTROL)"
                  @click="onCreate(item.period_id)"
                  class="text-primary-500 hover:text-primary-700"
                >
                  <PlusIcon class="h-4.5 w-4.5" />
                </button>

                <button
                  v-if="item.id && hasPermission(PERMISSIONS.ACT_MANAGE_CONTROL)"
                  @click="onView?.(item.id)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <Eye class="h-4.5 w-4.5" />
                </button>

                <button
                  v-if="item.id && hasPermission(PERMISSIONS.ACT_MANAGE_CONTROL)"
                  @click="deleteRow(item.id)"
                  class="text-red-600 hover:text-red-800"
                >
                  <Trash class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageStateWrapper>
</template>
  
  <script setup>
import { Eye, FileDown, PlusIcon, Trash } from 'lucide-vue-next';
import { useActionControlStore } from '@/store';
import StatusBadge from '@/components/ui/StatusBadge.vue';

import { usePageState } from '@/composables/usePageState';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useActionControlStore();
const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  await store.getAll(route.params.id);
});
const getRouteName = (suffix) => {
  return `action-${route.name.includes('edit') ? 'edit' : 'show'}-${suffix}`;
};

const onView = (id) =>
  router.push({
    name: getRouteName('control-show'),
    params: {
      id: route.params.id,
      controlId: id,
    },
  });

const onCreate = (periodId) =>
  router.push({
    name: getRouteName('control-create'),
    params: {
      id: route.params.id,
      periodId,
    },
  });

const deleteRow = async (id) => {
  const confirmationMessage = t('common.sweetalert.actions.confirmDelete');

  const confirm = await showConfirm({ message: confirmationMessage });

  if (confirm.isConfirmed) {
    try {
      const result = await store.destroy(id);
      showSimpleAlerte({ icon: 'success', text: result.message });
      await fetchWithState();
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};

const currentPeriod = (periodId) => {
  if (store.actionControls.length === 0) return null;
  const p = store.actionControls.find((item) => item.id === null);

  if (p.period_id === periodId) return p;
  return null;
};

onMounted(async () => {
  await fetchWithState();
});
</script>
  