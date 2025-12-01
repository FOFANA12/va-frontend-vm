<script setup>
import { Eye, Edit, Trash, Copy } from 'lucide-vue-next';
import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';

const { hasPermission } = usePermission();

const props = defineProps({
  row: Object,
  onView: Function,
  onEdit: Function,
  onDelete: Function,
  onCopy: Function,
});
</script>

<template>
  <div class="flex justify-center gap-2">
    <button
      v-if="hasPermission(PERMISSIONS.CREATE_INDICATOR)"
      @click="onCopy?.(row.id)"
      class="text-blue-500 hover:text-blue-700"
    >
      <Copy class="h-4 w-4" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.READ_INDICATORS)"
      @click="onView?.(row.id)"
      class="text-gray-500 hover:text-gray-700"
    >
      <Eye class="h-4.5 w-4.5" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.UPDATE_INDICATOR)"
      @click="onEdit?.(row.id)"
      class="text-primary-500 hover:text-primary-800"
    >
      <Edit class="h-4 w-4" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.DELETE_INDICATOR)"
      @click="onDelete?.([row.id])"
      class="text-red-600 hover:text-red-800"
    >
      <Trash class="h-4 w-4" />
    </button>
  </div>
</template>
