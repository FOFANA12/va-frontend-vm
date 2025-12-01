<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4 gap-4">
        <LinkButton
          :to="backRoute"
          variant="secondary"
          customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
        >
          {{ t('alignment.objective.btnList') }}
        </LinkButton>

        <LinkButton
          :to="{ name: 'action' }"
          variant="secondary"
          :newTab="true"
          customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
        >
          {{ t('alignment.goToActions') }}
        </LinkButton>

        <SubmitButton
          :busy="form.busy"
          customClass="min-w-[100px] bg-primary-500 px-3 text-white rounded-lg hover:bg-primary-600 transition duration-150 flex items-center justify-center"
        >
          <template #default>
            <LinkIcon class="w-5 h-5 mr-2" />
            {{ t('alignment.btnAligned') }} ({{ selectedActions.length }})
          </template>

          <template #loading>
            <LinkIcon class="w-5 h-5 mr-2" />
            {{ t('common.buttons.processing') }}
          </template>
        </SubmitButton>
      </div>

      <div class="w-full mx-auto bg-white rounded-lg my-6">
        <div class="card-body p-4">
          <div class="grid grid-cols-12 gap-4">
            <!-- Structure -->
            <div class="col-span-12 md:col-span-6">
              <SingleSelect
                id="structure"
                name="structure"
                v-model="currentStructure"
                @update:modelValue="onChangeStructure"
                :label="t('alignment.form.structure')"
                :options="objectiveAlignmentStore.structures"
                :placeholder="t('alignment.form.structurePlaceholder')"
                :control-class="'px-3 py-2.5'"
                :dropdown-class="'max-h-60'"
                :option-class="'text-sm'"
                :empty-message="t('common.select.noResults')"
                :search-placeholder="t('common.select.searchPlaceholder')"
                clearable
                filterable
                value-key="uuid"
                label-key="name"
              />
            </div>

            <!-- Current action plan -->
            <div class="col-span-12 md:col-span-6">
              <InputReadonly
                id="action_plan"
                name="action_plan"
                :label="t('alignment.form.currentActionPlan')"
                :placeholder="t('alignment.form.currentActionPlan')"
                :model-value="objectiveAlignmentStore.actionPlan?.name || '-'"
              />
            </div>
          </div>
        </div>
      </div>

      <Alert
        v-if="alertStore.hasMessage"
        :type="alertStore.message.type"
        :message="alertStore.message.text"
        @close="alertStore.resetMessage()"
        class="my-4 col-span-12"
      />

      <!-- Recherche -->
      <Input
        type="text"
        v-model="localSearch"
        :placeholder="t('common.searchPlaceholder')"
        class="mb-4"
      />

      <div class="overflow-x-auto">
        <table class="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead class="bg-gray-50 text-gray-700">
            <tr>
              <th class="w-[5%] text-center p-2 border">
                <input
                  type="checkbox"
                  :checked="allChecked"
                  @change="toggleSelectAll"
                  class="checkbox-primary h-4 w-4"
                />
              </th>
              <th class="w-[10%] text-left p-2 border">
                {{ t('alignment.table.reference') }}
              </th>
              <th class="w-[30%] text-left p-2 border">
                {{ t('alignment.table.actionName') }}
              </th>
              <th class="w-[10%] text-left p-2 border">
                {{ t('alignment.table.avancement') }}
              </th>
              <th class="w-[10%] text-left p-2 border">
                {{ t('alignment.table.disbursementRate') }}
              </th>
              <th class="w-[15%] text-left p-2 border">
                {{ t('common.table.status.label') }}
              </th>
              <th class="w-[15%] text-left p-2 border">
                {{ t('common.table.state') }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="paginatedActions.length === 0">
              <td colspan="7" class="text-center text-gray-500 py-4 border">
                {{ t('common.noData') }}
              </td>
            </tr>

            <tr
              v-for="action in paginatedActions"
              :key="action.uuid"
              :class="[
                'even:bg-gray-50 transition-colors',
                action.is_aligned
                  ? 'bg-green-50 text-green-700 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-100',
              ]"
            >
              <td class="text-center p-2 border">
                <input
                  type="checkbox"
                  v-model="selectedActions"
                  :value="action"
                  class="checkbox-primary h-4 w-4"
                  :disabled="action.is_aligned"
                />
              </td>

              <td class="p-2 border font-medium text-gray-800">
                {{ action.reference }}
              </td>

              <td class="p-2 border truncate max-w-[250px]" :title="action.name">
                {{ action.name }}
              </td>

              <td class="p-2 border text-gray-600 text-right whitespace-nowrap">
                {{ `${Number(action.actual_progress_percent || 0).toFixed(2)}%` }}
              </td>

              <td class="p-2 border text-gray-600 text-right whitespace-nowrap">
                {{ `${Number(action.disbursement_rate || 0).toFixed(2)}%` }}
              </td>

              <td class="p-2 border">
                <StatusBadge :status="action.status" />
              </td>

              <td class="p-2 border">
                <StatusBadge :status="action.state" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-600">
          {{ t('common.pagination') }} {{ currentPage }} / {{ totalPages }}
        </div>
        <div class="flex gap-1 items-center">
          <button
            class="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            {{ t('common.previous') }}
          </button>
          <button
            class="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            {{ t('common.next') }}
          </button>
        </div>
      </div>
    </form>
  </PageStateWrapper>
</template>
  
<script setup>
import { LinkIcon } from 'lucide-vue-next';
import StatusBadge from '@/components/ui/StatusBadge.vue';

import { useStrategicObjectiveAlignmentStore, useAlertStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const router = useRouter();
const objectiveAlignmentStore = useStrategicObjectiveAlignmentStore();
const alertStore = useAlertStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = objectiveAlignmentStore.form;

objectiveAlignmentStore.resetForm();
alertStore.resetMessage();
objectiveAlignmentStore.structures = [];
objectiveAlignmentStore.actionPlan = null;

const backRoute = computed(() => {
  return { name: route.name.replace(/-create$/, '') };
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await objectiveAlignmentStore.getStructures());

const currentStructure = ref(null);
const localSearch = ref('');
const selectedActions = ref([]);

const itemsPerPage = ref(10);
const currentPage = ref(1);

const onChangeStructure = async (structureUuid) => {
  alertStore.resetMessage();
  selectedActions.value = [];

  if (!structureUuid) return;

  const selectedStructure = objectiveAlignmentStore.structures.find(
    (s) => s.uuid === structureUuid
  );

  if (selectedStructure)
    await objectiveAlignmentStore.getActions(selectedStructure.id, route.params.id);
};

const filteredActions = computed(() => {
  return (objectiveAlignmentStore.actionPlan?.actions || []).filter((a) =>
    (a.name + a.reference).toLowerCase().includes(localSearch.value.toLowerCase())
  );
});

const paginatedActions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredActions.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(filteredActions.value.length / itemsPerPage.value));

watch(localSearch, () => {
  currentPage.value = 1;
});

const allChecked = computed(() => {
  const current = paginatedActions.value;
  return (
    current.length > 0 && current.every((a) => selectedActions.value.some((s) => s.uuid === a.uuid))
  );
});

const toggleSelectAll = () => {
  const current = paginatedActions.value;
  const selectedIds = selectedActions.value.map((a) => a.uuid);

  if (allChecked.value) {
    selectedActions.value = selectedActions.value.filter(
      (a) => !current.some((c) => c.uuid === a.uuid)
    );
  } else {
    const newItems = current.filter((a) => !selectedIds.includes(a.uuid) && !a.is_aligned);
    selectedActions.value.push(...newItems);
  }
};

const onSubmit = async () => {
  alertStore.resetMessage();

  try {
    const result = await objectiveAlignmentStore.align(route.params.id, selectedActions.value);
    showSimpleAlerte({ icon: 'success', text: result.message });
    selectedActions.value = [];
    router.push(backRoute.value);
  } catch (error) {
    const errors = error.errors || {};

    const firstControlItemError = Object.keys(errors).find((key) => key.startsWith('lines'));

    if (firstControlItemError) {
      const message = errors[firstControlItemError][0];
      alertStore.updateMessage('danger', message);
    }
  }
};

onMounted(async () => {
  await fetchWithState();
});
</script>
  