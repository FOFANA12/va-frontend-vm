<template>
  <div>
    <!-- Label -->
    <label v-if="label" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>

    <Listbox v-model="selectedValues" multiple as="div" class="relative">
      <ListboxButton
        class="relative w-full min-h-[2.5rem] flex items-center px-3 py-2 rounded-lg bg-white border text-left"
        :class="[error ? 'border-red-500' : 'border-secondary-300', controlClass]"
      >
        <div class="flex flex-wrap gap-1 flex-1 pr-8">
          <template v-if="selectedValues.length">
            <template v-if="selectedValues.length <= 2">
              <span
                v-for="value in selectedValues"
                :key="value"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                {{ getOptionLabel(value) }}
                <button
                  type="button"
                  class="ml-1 hover:text-red-600 focus:outline-none"
                  @click.stop="removeValue(value)"
                >
                  <X class="w-4 h-4" />
                </button>
              </span>
            </template>
            <span v-else class="text-sm text-secondary-900">
              {{ selectedValues.length }} items selected
            </span>
          </template>
          <span
            v-else
            class="block truncate text-sm font-normal leading-normal flex-1 text-gray-400"
          >
            {{ placeholder }}
          </span>
        </div>

        <!-- Clear all button -->
        <button
          v-if="clearable && selectedValues.length"
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

          <!-- Select all -->
          <div
            v-if="showSelectAll"
            class="px-3 py-2 border-b border-secondary-200 flex items-center cursor-pointer hover:bg-primary-50"
            @click="toggleSelectAll"
          >
            <input
              type="checkbox"
              :checked="isAllSelected"
              class="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            />
            <span class="ml-2 text-secondary-900">Select All</span>
          </div>

          <!-- Options -->
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

          <!-- Empty state -->
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
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>

    <!-- Hint -->
    <p v-if="$slots.hint" class="mt-1 text-xs text-secondary-500">
      <slot name="hint" />
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { Check, X } from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
  label: String,
  placeholder: {
    type: String,
    default: 'Select options',
  },
  required: Boolean,
  error: String,
  clearable: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
  emptyMessage: {
    type: String,
    default: 'No options available',
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  showSelectAll: {
    type: Boolean,
    default: false,
  },
  controlClass: {
    type: [String, Array, Object],
    default: '',
  },
  dropdownClass: {
    type: [String, Array, Object],
    default: '',
  },
  optionClass: {
    type: [String, Array, Object],
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedValues = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const searchTerm = ref('');
const open = ref(false);

const filteredOptions = computed(() => {
  if (!props.filterable || !searchTerm.value) return props.options;
  return props.options.filter((opt) =>
    String(opt[props.labelKey]).toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const isAllSelected = computed(() => {
  const allValues = props.options.map((opt) => opt[props.valueKey]);
  return allValues.every((val) => selectedValues.value.includes(val));
});

function getOptionLabel(value) {
  const option = props.options.find((opt) => opt[props.valueKey] === value);
  return option ? option[props.labelKey] : '';
}

function removeValue(valueToRemove) {
  selectedValues.value = selectedValues.value.filter((value) => value !== valueToRemove);
}

function clearSelection(e) {
  e.preventDefault();
  e.stopPropagation();
  selectedValues.value = [];
  searchTerm.value = '';
}

function toggleSelectAll() {
  const all = props.options.map((opt) => opt[props.valueKey]);
  selectedValues.value = isAllSelected.value ? [] : all;
}

watch(open, (isOpen) => {
  if (!isOpen) {
    searchTerm.value = '';
  }
});
</script>
