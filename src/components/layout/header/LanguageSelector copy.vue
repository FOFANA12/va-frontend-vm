<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click.prevent="toggleOpen"
      class="flex items-center text-gray-700 dark:text-gray-400"
      aria-label="Langue"
    >
      <span class="overflow-hidden rounded-full h-11 sm:w-11 mr-1 sm:mr-0 flex items-center justify-center">
        <Languages class="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </span>

      <!-- Texte (optionnel) -->
      <div class="hidden sm:flex flex-col items-start leading-none">
        <span class="text-sm font-medium">{{ currentLabel }}</span>
      </div>

      <!-- Chevron OUTSIDE du span Languages -->
      <component
        :is="dropdownOpen ? ChevronUp : ChevronDown"
        class="sm:ml-2 w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform pointer-events-none"
      />
    </button>

    <!-- Dropdown -->
    <div
      v-if="dropdownOpen"
      class="absolute left-0 mt-[12px] flex w-32 flex-col rounded-2xl px-2 border border-gray-200 bg-white py-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-10"
    >
      <ul class="flex flex-col gap-1">
        <li v-for="lng in props.languages" :key="lng.value">
          <button
            @click="select(lng.value)"
            class="flex items-center gap-3 px-4 py-1 w-full font-medium text-gray-700 rounded-lg text-theme-sm group hover:bg-primary-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <Check
              v-if="lng.value === props.modelValue"
              class="w-4 h-4 text-primary-500 group-hover:text-primary-500 pointer-events-none"
            />
            <span>{{ lng.label }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Languages, ChevronDown, ChevronUp, Check } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, required: true },
  languages: {
    type: Array,
    default: () => [
      { value: 'en', label: 'EN' },
      { value: 'fr', label: 'FR' },
    ],
  },
})
const emit = defineEmits(['update:modelValue'])

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const currentLabel = computed(() => {
  const found = props.languages.find((l) => l.value === props.modelValue)
  return found ? found.label : ''
})

function toggleOpen() {
  dropdownOpen.value = !dropdownOpen.value
}

function select(value) {
  emit('update:modelValue', value)
  dropdownOpen.value = false
}

function onClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>
