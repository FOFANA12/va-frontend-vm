<script setup>
import { Eye, X } from 'lucide-vue-next';

const props = defineProps({
  row: Object,
  onView: Function,
  onUnalign: Function,
});
</script>

<template>
  <div class="flex justify-center gap-2">
    <button
      @click="onView?.(row.obj_id)"
      class="text-gray-500 hover:text-gray-700"
    >
      <Eye class="h-4.5 w-4.5" />
    </button>

    <button
      @click="onUnalign?.([row.id])"
      class="text-red-600 hover:text-red-800"
    >
     <X class="h-4 w-4" />
    </button>
  </div>
</template>
