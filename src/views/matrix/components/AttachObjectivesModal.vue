<template>
  <CustomModal size="xl" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ t('matrixPeriod.form.attachObjectivesTitle') }}</h2>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Sélection de l’axe stratégique -->
        <SingleSelect
          id="strategic_axis"
          name="strategic_axis"
          v-model="selectedAxis"
          @update:modelValue="onChangeAxis"
          :label="t('matrixPeriod.form.strategicAxis')"
          :options="store.strategicAxes"
          :placeholder="t('matrixPeriod.form.strategicAxisPlaceholder')"
          :control-class="'px-3 py-2.5'"
          :dropdown-class="'max-h-60'"
          :option-class="'text-sm'"
          :empty-message="t('common.select.noResults')"
          :search-placeholder="t('common.select.searchPlaceholder')"
          value-key="uuid"
          label-key="name"
          filterable
          clearable
          required
        />

        <!-- Barre de recherche -->
        <Input v-model="localSearch" type="text" :placeholder="t('common.searchPlaceholder')" />

        <!-- Tableau des objectifs -->
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-300 mt-2">
            <thead class="bg-gray-50 text-gray-700">
              <tr>
                <th class="p-2 border w-[5%] text-center">
                  <input
                    type="checkbox"
                    :checked="allChecked"
                    @change="toggleSelectAll"
                    class="checkbox-primary h-5 w-5"
                  />
                </th>
                <th class="text-left p-2 border">
                  {{ t('matrixPeriod.objectives.table.name') }}
                </th>
                <th class="text-left p-2 border w-[20%]">
                  {{ t('matrixPeriod.objectives.table.startDate') }}
                </th>
                <th class="text-left p-2 border w-[20%]">
                  {{ t('matrixPeriod.objectives.table.endDate') }}
                </th>
                <th class="text-left p-2 border w-[15%]">
                  {{ t('common.table.status.label') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedObjectives.length === 0">
                <td colspan="5" class="text-center text-gray-500 py-4 border">
                  {{ t('common.noData') }}
                </td>
              </tr>
              <tr
                v-for="objective in paginatedObjectives"
                :key="objective.uuid"
                class="bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td class="p-2 border text-center">
                  <input
                    type="checkbox"
                    v-model="selectedObjectives"
                    :value="objective"
                    class="checkbox-primary h-5 w-5"
                  />
                </td>
                <td class="p-2 border">
                  <span class="font-medium">{{ objective.reference }}</span> — {{ objective.name }}
                </td>
                <td class="p-2 border">{{ objective.start_date }}</td>
                <td class="p-2 border">{{ objective.end_date }}</td>
                <td class="p-2 border">
                  <StatusBadge :status="objective.status" />
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
      </div>
    </template>

    <template #buttons>
      <button
        type="button"
        class="min-w-[100px] bg-gray-300 text-gray-700 py-2 px-3 rounded hover:bg-gray-400 transition-all"
        @click="closeModal"
      >
        {{ t('common.modal.buttons.close') }}
      </button>
      <button
        v-if="selectedObjectives.length > 0"
        variant="primary"
        class="min-w-[100px] bg-primary-600 text-white py-2 px-3 rounded hover:bg-primary-700 transition-all ml-2"
        @click="onSubmit"
      >
        {{ t('common.modal.buttons.save') }}
      </button>
    </template>
  </CustomModal>
</template>

<script setup>
import { useMatrixPeriodStore } from '@/store';
const store = useMatrixPeriodStore();
const { t } = useI18n();
const emit = defineEmits(['success']);
import StatusBadge from '@/components/ui/StatusBadge.vue';

const isModalOpen = ref(false);
const route = useRoute();
const selectedAxis = ref(null);
const strategicAxes = ref([]);
const axisObjectives = ref([]);
const selectedObjectives = ref([]);
const localSearch = ref('');
const currentMatrixPeriodId = ref(null);

// Pagination
const itemsPerPage = ref(15);
const currentPage = ref(1);

const filteredObjectives = computed(() =>
  axisObjectives.value.filter((o) =>
    `${o.code} ${o.title}`.toLowerCase().includes(localSearch.value.toLowerCase())
  )
);
const paginatedObjectives = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredObjectives.value.slice(start, start + itemsPerPage.value);
});
const totalPages = computed(() => Math.ceil(filteredObjectives.value.length / itemsPerPage.value));

watch(localSearch, () => (currentPage.value = 1));

// Checkbox logic
const allChecked = computed(() => {
  const current = paginatedObjectives.value;
  return (
    current.length > 0 &&
    current.every((o) => selectedObjectives.value.some((sel) => sel.uuid === o.uuid))
  );
});

const toggleSelectAll = () => {
  const current = paginatedObjectives.value;
  const selectedIds = selectedObjectives.value.map((o) => o.uuid);
  if (allChecked.value) {
    selectedObjectives.value = selectedObjectives.value.filter(
      (s) => !current.some((c) => c.uuid === s.uuid)
    );
  } else {
    const newItems = current.filter((s) => !selectedIds.includes(s.uuid));
    selectedObjectives.value.push(...newItems);
  }
};

// Data loading
const loadAvailableObjectives = async () => {
  try {
    const result = await store.availableObjectives(route.params.id, currentMatrixPeriodId.value);
    strategicAxes.value = result.strategic_axes || [];
  } catch (err) {
    console.error('Error loading available objectives:', err);
  }
};

const onChangeAxis = (axisUuid) => {
  if (!axisUuid) {
    axisObjectives.value = [];
    return;
  }
  const axis = strategicAxes.value.find((a) => a.uuid === axisUuid);
  axisObjectives.value = axis ? axis.objectives || [] : [];
  currentPage.value = 1;
  selectedObjectives.value = [];
};

// Submit
const onSubmit = async () => {
  try {
    const result = await store.attachObjectives(
      currentMatrixPeriodId.value,
      selectedObjectives.value.map((o) => o.uuid)
    );

    emit('success', result);
    closeModal();
  } catch (error) {
    console.error('Error attaching objectives:', error);
  }
};

const openModal = async (matrixPeriodId) => {
  selectedAxis.value = null;
  selectedObjectives.value = [];
  axisObjectives.value = [];
  currentMatrixPeriodId.value = matrixPeriodId;
  await loadAvailableObjectives();
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  localSearch.value = '';
  selectedObjectives.value = [];
};

defineExpose({ openModal });
</script>
