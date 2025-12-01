<template>
  <!-- Action button add -->
  <div class="flex justify-end mt-4 mb-6">
    <Button :icon="Plus" variant="primary" customClass="sm:px-4" @click="openCreateModal">
      {{ t('strategicAxis.btnAdd') }}
    </Button>
  </div>

  <!-- List of axes -->
  <div class="space-y-6">
    <div
      v-for="axis in strategicMap.axes"
      :key="axis.id"
      class="w-full mx-auto bg-white rounded-lg border border-gray-200"
    >
      <!-- Card header -->
      <div class="flex items-center justify-between p-4 border-b">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">
            {{ axis.name }}
          </h2>
          <p class="text-sm text-gray-500">
            {{ axis.description }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="text-primary-500 hover:text-primary-700 transition-colors"
            @click="openEditModal(axis.id)"
          >
            <Edit class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="text-red-500 hover:text-red-700 transition-colors"
            @click="deleteAxis(axis.id)"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="p-4 text-gray-600 text-sm">
        {{ t('strategicAxis.panel.axisDetails') }}
      </div>
    </div>

    <div
      class="w-full mx-auto bg-white rounded-lg"
      v-if="!strategicMap.axes || strategicMap.axes.length === 0"
    >
      <div class="card-body p-4">
        <div class="flex flex-col items-center justify-center py-6 text-center">
          <p class="text-lg text-red-600">
            {{ t('strategicAxis.noData') }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <Modal ref="modal" @success="handleSuccess" />
</template>

<script setup>
import { Edit, Plus, TrashIcon } from 'lucide-vue-next';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { useStrategicAxisStore } from '@/store';
import Modal from './components/Modal.vue';

const emit = defineEmits(['refreshStrategicMap']);
const { t } = useI18n();
const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();
const store = useStrategicAxisStore();
const modal = ref(null);

const props = defineProps({
  strategicMap: {
    type: Object,
    required: true,
  },
});

const handleSuccess = async (result) => {
  emit('refreshStrategicMap');
  showSimpleAlerte({ icon: 'success', text: result.message });
};

const openCreateModal = () => modal.value.openCreateModal();
const openEditModal = (id) => modal.value.openEditModal(id);
const openViewModal = (id) => modal.value.openViewModal(id);

const deleteAxis = async (id) => {
  const confirm = await showConfirm({
    message: t('common.sweetalert.actions.confirmDelete'),
  });

  if (confirm.isConfirmed) {
    try {
      const result = await store.destroy(id);
      showSimpleAlerte({ icon: 'success', text: result.message });
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};
</script>
