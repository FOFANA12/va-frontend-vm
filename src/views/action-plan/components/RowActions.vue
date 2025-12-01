<script setup>
import { Eye, Copy, Edit, Trash, FileDown } from 'lucide-vue-next';
import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';

const { hasPermission } = usePermission();

const props = defineProps({
  row: Object,
  onExport: Function,
  onCopy: Function,
  onView: Function,
  onEdit: Function,
  onDelete: Function,
});
</script>

<template>
  <div class="flex justify-center gap-2">
    <button
      v-if="hasPermission(PERMISSIONS.CREATE_ACTION_PLAN)"
      @click="onCopy?.(row.id)"
      class="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
    >
      <Copy class="h-4 w-4" />
    </button>

    <button
      v-if="onExport"
      @click="onExport(row.export_excel_url)"
      class="text-green-600 hover:text-green-800"
    >
      <FileDown class="h-4 w-4" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.READ_ACTION_PLANS)"
      @click="onView?.(row.id)"
      class="text-gray-500 hover:text-gray-700"
    >
      <Eye class="h-4.5 w-4.5" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.UPDATE_ACTION_PLAN)"
      @click="onEdit?.(row.id)"
      class="text-primary-500 hover:text-primary-800"
    >
      <Edit class="h-4 w-4" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.DELETE_ACTION_PLAN)"
      @click="onDelete?.([row.id])"
      class="text-red-600 hover:text-red-800"
    >
      <Trash class="h-4 w-4" />
    </button>
  </div>
</template>
