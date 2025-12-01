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
          {{ t('alignment.action.btnList') }}
        </LinkButton>

        <LinkButton
          :to="{ name: 'strategicObjective' }"
          variant="secondary"
          :newTab="true"
          customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
        >
          {{ t('alignment.goToStrategicObjectives') }}
        </LinkButton>

        <SubmitButton
          :busy="form.busy"
          customClass="min-w-[100px] bg-primary-500 px-3 text-white rounded-lg hover:bg-primary-600 transition duration-150 flex items-center justify-center"
        >
          <template #default>
            <LinkIcon class="w-5 h-5 mr-2" />
            {{ t('alignment.btnAligned') }} ({{ selectedObjectives.length }})
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
                :options="actionAlignmentStore.structures"
                :placeholder="t('alignment.form.structurePlaceholder')"
                value-key="uuid"
                label-key="name"
                filterable
                clearable
              />
            </div>

            <!-- Strategic map -->
            <div class="col-span-12 md:col-span-6" v-if="strategicMapsFiltered.length">
              <SingleSelect
                id="strategic_map"
                name="strategic_map"
                v-model="currentMap"
                @update:modelValue="onChangeMap"
                :label="t('alignment.form.strategicMap')"
                :options="strategicMapsFiltered"
                :placeholder="t('alignment.form.strategicMapPlaceholder')"
                value-key="uuid"
                label-key="name"
                filterable
                clearable
              />
            </div>

            <!-- Strategic Element -->
            <div class="col-span-12 md:col-span-6" v-if="strategicElementsFiltered.length">
              <SingleSelect
                id="strategic_element"
                name="strategic_element"
                v-model="currentElement"
                @update:modelValue="onChangeElement"
                :options="strategicElementsFiltered"
                :label="
                  selectedStructure?.type === 'STATE'
                    ? t('alignment.form.strategicLever')
                    : t('alignment.form.strategicAxis')
                "
                :placeholder="
                  selectedStructure?.type === 'STATE'
                    ? t('alignment.form.strategicLeverPlaceholder')
                    : t('alignment.form.strategicAxisPlaceholder')
                "
                value-key="uuid"
                label-key="name"
                filterable
                clearable
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
                {{ t('alignment.table.objectiveName') }}
              </th>
              <th class="w-[12%] text-left p-2 border">
                {{ t('strategicObjective.table.startDate') }}
              </th>
              <th class="w-[12%] text-left p-2 border">
                {{ t('strategicObjective.table.endDate') }}
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
            <tr v-if="paginatedObjectives.length === 0">
              <td colspan="7" class="text-center text-gray-500 py-4 border">
                {{ t('common.noData') }}
              </td>
            </tr>

            <tr
              v-for="objective in paginatedObjectives"
              :key="objective.uuid"
              :class="[
                'even:bg-gray-50 transition-colors',
                objective.is_aligned
                  ? 'bg-green-50 text-green-700 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-100',
              ]"
            >
              <td class="text-center p-2 border">
                <input
                  type="checkbox"
                  v-model="selectedObjectives"
                  :value="objective"
                  class="checkbox-primary h-4 w-4"
                  :disabled="objective.is_aligned"
                />
              </td>

              <td class="p-2 border font-medium text-gray-800">
                {{ objective.reference }}
              </td>

              <td class="p-2 border truncate max-w-[250px]" :title="objective.name">
                {{ objective.name }}
              </td>

              <td class="p-2 border text-gray-600 whitespace-nowrap">
                {{ objective.start_date }}
              </td>

              <td class="p-2 border text-gray-600 whitespace-nowrap">
                {{ objective.end_date }}
              </td>

              <td class="p-2 border">
                <StatusBadge :status="objective.status" />
              </td>

              <td class="p-2 border">
                <StatusBadge :status="objective.state" />
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

import { useActionAlignmentStore, useAlertStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const router = useRouter();
const actionAlignmentStore = useActionAlignmentStore();
const alertStore = useAlertStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = actionAlignmentStore.form;

actionAlignmentStore.resetForm();
alertStore.resetMessage();
actionAlignmentStore.strategicMap = null;

const backRoute = computed(() => {
  return { name: route.name.replace(/-create$/, '') };
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await actionAlignmentStore.requirements(route.params.id));

const currentStructure = ref(null);
const currentMap = ref(null);
const currentElement = ref(null);

const strategicMapsFiltered = ref([]);
const strategicElementsFiltered = ref([]);
const objectivesFiltered = ref([]);

const localSearch = ref('');
const selectedObjectives = ref([]);

const itemsPerPage = ref(10);
const currentPage = ref(1);

const selectedStructure = computed(() =>
  actionAlignmentStore.structures.find((s) => s.uuid === currentStructure.value)
);

const filteredObjectives = computed(() => {
  return objectivesFiltered.value.filter((o) =>
    (o.name + o.reference).toLowerCase().includes(localSearch.value.toLowerCase())
  );
});

const paginatedObjectives = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredObjectives.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(filteredObjectives.value.length / itemsPerPage.value));

watch(localSearch, () => {
  currentPage.value = 1;
});

const onChangeStructure = (uuid) => {
  currentMap.value = null;
  currentElement.value = null;

  strategicMapsFiltered.value = [];
  strategicElementsFiltered.value = [];
  objectivesFiltered.value = [];

  selectedObjectives.value = [];

  const struct = actionAlignmentStore.structures.find((s) => s.uuid === uuid);
  if (!struct) return;

  strategicMapsFiltered.value = struct.strategic_maps;
};

const onChangeMap = (mapUuid) => {
  currentElement.value = null;
  strategicElementsFiltered.value = [];
  objectivesFiltered.value = [];
  selectedObjectives.value = [];

  const struct = actionAlignmentStore.structures.find((s) => s.uuid === currentStructure.value);
  if (!struct) return;

  const map = struct.strategic_maps.find((m) => m.uuid === mapUuid);
  if (!map) return;

  strategicElementsFiltered.value = map.elements;
};

const onChangeElement = (eltUuid) => {
  objectivesFiltered.value = [];
  selectedObjectives.value = [];

  const elt = strategicElementsFiltered.value.find((e) => e.uuid === eltUuid);
  if (!elt) return;

  objectivesFiltered.value = elt.objectives;
  currentPage.value = 1;
};

const allChecked = computed(() => {
  const current = paginatedObjectives.value;
  return (
    current.length > 0 &&
    current.every((o) => selectedObjectives.value.some((s) => s.uuid === o.uuid))
  );
});

const toggleSelectAll = () => {
  const current = paginatedObjectives.value;
  const selectedIds = selectedObjectives.value.map((o) => o.uuid);

  if (allChecked.value) {
    selectedObjectives.value = selectedObjectives.value.filter(
      (o) => !current.some((c) => c.uuid === o.uuid)
    );
  } else {
    const newItems = current.filter((o) => !selectedIds.includes(o.uuid) && !o.is_aligned);
    selectedObjectives.value.push(...newItems);
  }
};

const onSubmit = async () => {
  alertStore.resetMessage();

  try {
    const result = await actionAlignmentStore.align(route.params.id, selectedObjectives.value);
    showSimpleAlerte({ icon: 'success', text: result.message });
    selectedObjectives.value = [];
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
  