<script setup>
import { Eye, Edit, Trash } from 'lucide-vue-next';
import { useObjectiveRules } from '@/composables/useObjectiveRules';
import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';

const { isLocked } = useObjectiveRules();
const { hasPermission } = usePermission();

const props = defineProps({
  row: Object,
  onView: Function,
  onEdit: Function,
  onDelete: Function,
});

const isObjectiveLocked = computed(() => isLocked(props.row.status));

</script>

<template>
  <div class="flex justify-center gap-2">
    <button
      v-if="hasPermission(PERMISSIONS.READ_STRATEGIC_OBJECTIVES)"
      @click="onView?.(row.id)"
      class="text-gray-500 hover:text-gray-700"
    >
      <Eye class="h-4.5 w-4.5" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.UPDATE_STRATEGIC_OBJECTIVE) && !isObjectiveLocked"
      @click="onEdit?.(row.id)"
      class="text-primary-500 hover:text-primary-800"
    >
      <Edit class="h-4 w-4" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.DELETE_STRATEGIC_OBJECTIVE) && !isObjectiveLocked"
      @click="onDelete?.([row.id])"
      class="text-red-600 hover:text-red-800"
    >
      <Trash class="h-4 w-4" />
    </button>
  </div>
</template>
