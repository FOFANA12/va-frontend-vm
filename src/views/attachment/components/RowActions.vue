<script setup>
import { Eye, Trash } from 'lucide-vue-next';

const props = defineProps({
  row: Object,
  onView: Function,
  onDelete: Function,
  canAccess: Boolean,
  canManage: Boolean,
});
</script>

<template>
  <div class="flex justify-center gap-2">
    <button @click="onView?.(row.id)" class="text-gray-500 hover:text-gray-700">
      <Eye class="h-4.5 w-4.5" />
    </button>

    <button v-if="canManage" @click="onDelete?.([row.id])" class="text-red-600 hover:text-red-800">
      <Trash class="h-4 w-4" />
    </button>
  </div>
</template>
