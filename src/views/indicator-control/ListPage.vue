<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <!-- Indicator buttons -->
    <div class="flex justify-end mt-4 mb-6 gap-4">
      <LinkButton
        :to="{ name: 'indicator' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('indicator.btnList') }}
      </LinkButton>
    </div>

    <!-- Add table here -->
    <div class="w-full bg-white mx-auto rounded-lg mb-4 overflow-hidden">
      <table class="min-w-full table-auto border-collapse">
        <thead class="bg-white text-gray-700">
          <tr>
            <th class="w-2/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('indicatorControl.table.indicatorPeriod') }}
            </th>
            <th class="w-2/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('indicatorControl.table.targetValue') }}
            </th>
            <th class="w-2/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('common.table.status.label') }}
            </th>
            <th class="w-2/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('indicatorControl.table.controlDate') }}
            </th>
            <th class="w-1/10 px-4 py-1.5 border-b border-gray-300 text-left">
              {{ t('indicatorControl.table.achievedValue') }}
            </th>
            <th class="px-4 py-1.5 border-b border-gray-300 text-center w-[120px]">
              {{ t('common.table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!store.indicatorControls || store.indicatorControls.length === 0">
            <td colspan="6" class="bg-white text-center py-4 text-gray-500 border border-gray-100">
              {{ t('indicatorControl.noPlanningYet') }}
            </td>
          </tr>
          <tr
            v-for="(item, index) in store.indicatorControls"
            :key="index"
            class="bg-white hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.indicator_period }}
            </td>

            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.target_value }}
            </td>
            <td class="px-4 py-2 border-t border-gray-200">
              <StatusBadge
                :status="{
                  label: item.id
                    ? t('indicatorControl.table.status.control')
                    : t('indicatorControl.table.status.noControl'),
                  color: item.id ? '#22c55e' : '#f59e0b',
                }"
              />
            </td>

            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.control_date ? `${item.control_date}` : '-' }}
            </td>

            <td class="px-4 py-2 border-t border-gray-200">
              {{ item.achieved_value }}
            </td>

            <td class="px-4 py-2 border-t border-gray-200 text-center">
              <div class="flex justify-center gap-2">
                <button
                  v-if="!item.id && currentPeriod(item.period_id)"
                  @click="onCreate(item.period_id)"
                  class="text-primary-500 hover:text-primary-700"
                >
                  <PlusIcon class="h-4.5 w-4.5" />
                </button>

                <button
                  v-if="item.id"
                  @click="onView?.(item.id)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <Eye class="h-4.5 w-4.5" />
                </button>

                <button
                  v-if="item.id"
                  @click="deleteRow([item.id])"
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
import { useIndicatorControlStore } from '@/store';
import StatusBadge from '@/components/ui/StatusBadge.vue';

import { usePageState } from '@/composables/usePageState';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useIndicatorControlStore();
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
  return `indicator-${route.name.includes('edit') ? 'edit' : 'show'}-${suffix}`;
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
  if (store.indicatorControls.length === 0) return null;
  const p = store.indicatorControls.find((item) => item.id === null);

  if (p.period_id === periodId) return p;
  return null;
};

onMounted(async () => {
  await fetchWithState();
});
</script>
  