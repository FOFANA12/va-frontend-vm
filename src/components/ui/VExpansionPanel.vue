<template>
  <div class="border rounded-lg overflow-hidden">
    <div
      @click="togglePanel"
      class="flex items-center justify-between px-4 py-3 cursor-pointer bg-white hover:bg-gray-50 transition rounded-t-lg"
    >
      <slot name="title">
        <span class="font-medium text-gray-700">Titre</span>
      </slot>
      <component :is="isOpen ? ChevronUp : ChevronDown" class="w-5 h-5 text-gray-500" />
    </div>

    <transition name="accordion">
      <div v-show="isOpen" class="border-t border-gray-200 shadow-sm rounded-b-lg">
        <slot name="body">
          <p class="text-gray-600">Contenu par défaut</p>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import { ChevronUp, ChevronDown } from 'lucide-vue-next';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

// Injecte l'état global des panels
const expansionPanels = inject('expansionPanels');

const isOpen = computed(() => expansionPanels?.activePanelIndex.value === props.index);

const togglePanel = () => {
  expansionPanels?.setActivePanelIndex(props.index);
};
</script>

<style scoped>
/* Transition de l'accordéon */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.2s ease, opacity 0.2s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
