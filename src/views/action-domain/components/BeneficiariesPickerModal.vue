<template>
  <CustomModal size="lg" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ t('actionDomain.beneficiaries.modalTitle') }}</h2>
    </template>

    <template #body>
      <div class="space-y-4">
        <!-- Recherche -->
        <Input type="text" v-model="localSearch" :placeholder="t('common.searchPlaceholder')" />

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-300 mt-4">
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
                  {{ t('actionDomain.beneficiaries.name') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedBeneficiaries.length === 0">
                <td colspan="3" class="text-center text-gray-500 py-4 border">
                  {{ t('common.noData') }}
                </td>
              </tr>
              <tr
                v-for="beneficiary in paginatedBeneficiaries"
                :key="beneficiary.uuid"
                class="bg-white even:bg-gray-50"
              >
                <td class="p-2 border text-center">
                  <input
                    type="checkbox"
                    v-model="selectedBeneficiaries"
                    :value="beneficiary"
                    class="checkbox-primary h-5 w-5"
                  />
                </td>
                <td class="p-2 border">{{ beneficiary.name }}</td>
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
        type="button"
        class="min-w-[100px] bg-primary-600 text-white py-2 px-3 rounded hover:bg-primary-700 transition-all ml-2"
        @click="confirmSelection"
        :disabled="selectedBeneficiaries.length === 0"
      >
        {{ t('actionDomain.beneficiaries.btnValidate') }}
      </button>
    </template>
  </CustomModal>
</template>

<script setup>
import { useActionDomainStore } from '@/store';

const { t } = useI18n();
const store = useActionDomainStore();

const isModalOpen = ref(false);
const localSearch = ref('');
const selectedBeneficiaries = ref([]);

const itemsPerPage = ref(20);
const currentPage = ref(1);

const emit = defineEmits(['onSelect']);

// Liste filtrée
const filteredBeneficiaries = computed(() => {
  return store.beneficiaries.filter((b) =>
    b.name.toLowerCase().includes(localSearch.value.toLowerCase())
  );
});

// Pagination
const paginatedBeneficiaries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredBeneficiaries.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() =>
  Math.ceil(filteredBeneficiaries.value.length / itemsPerPage.value)
);

watch(localSearch, () => {
  currentPage.value = 1;
});

// Sélection globale
const allChecked = computed(() => {
  const current = paginatedBeneficiaries.value;
  return (
    current.length > 0 &&
    current.every((b) => selectedBeneficiaries.value.some((s) => s.uuid === b.uuid))
  );
});

const toggleSelectAll = () => {
  const current = paginatedBeneficiaries.value;
  const selectedIds = selectedBeneficiaries.value.map((b) => b.uuid);

  if (allChecked.value) {
    selectedBeneficiaries.value = selectedBeneficiaries.value.filter(
      (b) => !current.some((c) => c.uuid === b.uuid)
    );
  } else {
    const newItems = current.filter((b) => !selectedIds.includes(b.uuid));
    selectedBeneficiaries.value.push(...newItems);
  }
};

const confirmSelection = () => {
  emit('onSelect', selectedBeneficiaries.value);
  closeModal();
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedBeneficiaries.value = [];
  localSearch.value = '';
  currentPage.value = 1;
};

const openModal = () => {
  isModalOpen.value = true;
};

defineExpose({ openModal });
</script>
