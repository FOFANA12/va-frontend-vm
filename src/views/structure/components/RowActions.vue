<script setup>
import { Eye, Edit, Trash, FileDown } from 'lucide-vue-next';
import DropdownTable from '@/components/ui/DropdownTable.vue';
import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';

const { hasPermission } = usePermission();

const { t } = useI18n();

const props = defineProps({
  row: Object,
  onExport: Function,
  onView: Function,
  onEdit: Function,
  onDelete: Function,
  onOptionAction: Function,
});

const exportOptions = [
  { label: t('common.exports.actionPlan'), value: 'export_action_plan_url', color: 'bg-green-500' },
  { label: t('common.exports.bilan'), value: 'export_bilan_url', color: 'bg-yellow-500' },
  { label: t('common.exports.ppm'), value: 'export_ppm_url', color: 'bg-blue-500' },
  { label: t('common.exports.paa'), value: 'export_paa_url', color: 'bg-purple-500' },
  { label: t('common.exports.objective'), value: 'export_objective_url', color: 'bg-indigo-500' },
  {
    label: t('common.exports.objectiveDecision'),
    value: 'export_objective_decision_url',
    color: 'bg-red-500',
  },
];
</script>

<template>
  <div class="flex justify-center gap-2">
    <DropdownTable
      v-if="props.onOptionAction"
      :options="exportOptions"
      :onSelect="
        (val) => {
          const url = props.row[val];
          if (url) props.onOptionAction(url);
        }
      "
      width="w-64"
    >
      <template #trigger>
        <button class="text-green-600 hover:text-green-800">
          <FileDown class="h-4 w-4" />
        </button>
      </template>
    </DropdownTable>

    <button
      v-if="hasPermission(PERMISSIONS.READ_STRUCTURES)"
      @click="onView?.(row.id)"
      class="text-gray-500 hover:text-gray-700"
    >
      <Eye class="h-4.5 w-4.5" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.UPDATE_STRUCTURE)"
      @click="onEdit?.(row.id)"
      class="text-primary-500 hover:text-primary-800"
    >
      <Edit class="h-4 w-4" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.DELETE_STRUCTURE)"
      @click="onDelete?.([row.id])"
      class="text-red-600 hover:text-red-800"
    >
      <Trash class="h-4 w-4" />
    </button>
  </div>
</template>
