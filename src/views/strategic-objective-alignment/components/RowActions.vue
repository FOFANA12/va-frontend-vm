<script setup>
import { Eye, X } from 'lucide-vue-next';
import { useObjectiveRules } from '@/composables/useObjectiveRules';
import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';

const { canManageAlignment } = useObjectiveRules();
const { hasPermission } = usePermission();

const props = defineProps({
  row: Object,
  onView: Function,
  onUnalign: Function,
  objectiveStatus: { type: [String, Object, null], required: false, default: null },
});
const allowed = computed(() => canManageAlignment(props.objectiveStatus));
console.log(objectiveStatus);
</script>

<template>
  <div class="flex justify-center gap-2">
    <button @click="onView?.(row.action_id)" class="text-gray-500 hover:text-gray-700">
      <Eye class="h-4.5 w-4.5" />
    </button>

    <button
      v-if="hasPermission(PERMISSIONS.OBJ_MANAGE_ALIGNMENT) && allowed"
      @click="onUnalign?.([row.id])"
      class="text-red-600 hover:text-red-800"
    >
      <X class="h-4 w-4" />
    </button>
  </div>
</template>
