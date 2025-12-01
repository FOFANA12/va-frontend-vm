<template>
  <div>
    <!-- Label -->
    <label v-if="label" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>

    <Listbox v-model="selectedValue" as="div" class="relative">
      <ListboxButton
        class="relative w-full min-h-[2.5rem] flex items-center px-3 py-2 rounded-lg bg-white border text-left"
        :class="[error ? 'border-red-500' : 'border-secondary-300', controlClass]"
      >
        <span
          class="block truncate text-sm font-normal leading-normal flex-1"
          :class="selectedValue ? 'text-secondary-900' : 'text-gray-400'"
        >
          {{ selectedLabel || placeholder }}
        </span>

        <!-- Bouton clear -->
        <button
          v-if="clearable && selectedValue"
          type="button"
          class="absolute right-8 inset-y-0 flex items-center px-1 text-secondary-400 hover:text-red-600"
          @click.stop="clearSelection"
          aria-label="Clear selection"
        >
          <X class="w-4 h-4" />
        </button>

        <!-- Chevron -->
        <span class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <svg
            class="w-4 h-4 text-secondary-400 transition-transform"
            :class="{ 'rotate-180': open }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white border border-secondary-300 shadow-sm text-sm max-h-60"
          :class="dropdownClass"
        >
          <!-- Search input -->
          <div v-if="filterable" class="sticky top-0 bg-white p-2 border-b border-secondary-200">
            <input
              v-model="searchTerm"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full px-2 py-1 text-sm border border-secondary-300 rounded-md focus:border-primary-500 focus:outline-none"
              @click.stop
            />
          </div>

          <!-- Option list -->
          <ListboxOption
            v-for="option in filteredOptions"
            :key="option[valueKey]"
            :value="option[valueKey]"
            v-slot="{ active, selected }"
            as="template"
          >
            <li
              :class="[
                'cursor-pointer select-none px-3 py-2 flex items-center',
                active ? 'bg-primary-100 text-primary-900' : 'text-secondary-900',
                optionClass,
              ]"
            >
              <Check v-if="selected" class="w-4 h-4 text-primary-600 mr-2" />
              <span class="block truncate">{{ option[labelKey] }}</span>
            </li>
          </ListboxOption>

          <!-- Empty message -->
          <div
            v-if="filteredOptions.length === 0"
            class="py-4 text-center text-secondary-500 text-sm"
          >
            {{ emptyMessage }}
          </div>
        </ListboxOptions>
      </transition>
    </Listbox>

    <!-- Error message -->
    <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>

    <!-- Hint -->
    <p v-if="$slots.hint" class="mt-1 text-xs text-secondary-500">
      <slot name="hint" />
    </p>
  </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { Check, X } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  options: { type: Array, required: true },
  label: String,
  placeholder: { type: String, default: 'Select option' },
  searchPlaceholder: { type: String, default: 'Search...' },
  emptyMessage: { type: String, default: 'No options available' },
  required: Boolean,
  error: String,
  clearable: { type: Boolean, default: false },
  filterable: { type: Boolean, default: false },
  valueKey: { type: String, default: 'value' },
  labelKey: { type: String, default: 'label' },
  controlClass: { type: [String, Array, Object], default: '' },
  dropdownClass: { type: [String, Array, Object], default: '' },
  optionClass: { type: [String, Array, Object], default: '' },
});

const emit = defineEmits(['update:modelValue', 'input']);

const selectedValue = computed({
  get: () => props.modelValue,
  // set: (value) => emit('update:modelValue', value),
  set: (value) => {
    emit('update:modelValue', value);
    emit('input', value);
  },
});

const selectedLabel = computed(() => {
  const selected = props.options.find((opt) => opt[props.valueKey] === selectedValue.value);
  return selected ? selected[props.labelKey] : '';
});

const searchTerm = ref('');
const open = ref(false);

const filteredOptions = computed(() => {
  if (!props.filterable || !searchTerm.value) return props.options;
  return props.options.filter((opt) =>
    String(opt[props.labelKey]).toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

function clearSelection(e) {
  e.preventDefault();
  e.stopPropagation();
  selectedValue.value = null;
  searchTerm.value = '';
}

watch(open, (isOpen) => {
  if (!isOpen) {
    searchTerm.value = '';
  }
});
</script>
