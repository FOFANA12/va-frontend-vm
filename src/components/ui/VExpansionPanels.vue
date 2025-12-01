<template>
  <div class="overflow-hidden">
    <slot />
  </div>
</template>

<script setup>
import { ref, provide, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [Number, null],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const activePanelIndex = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    activePanelIndex.value = newValue;
  }
);

const setActivePanelIndex = (index) => {
  activePanelIndex.value = activePanelIndex.value === index ? null : index;
  emit("update:modelValue", activePanelIndex.value);
};

provide("expansionPanels", {
  activePanelIndex,
  setActivePanelIndex,
});
</script>

<style scoped></style>
