<template>
  <div class="relative w-full">
    <div class="relative">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <Search class="w-4 h-4 text-secondary-400" />
      </span>
      <input
        ref="inputRef"
        type="text"
        v-model="localSearchTerm"
        @input="onSearchInput"
        @focus="onFocus"
        @blur="onBlur"
        :placeholder="placeholder"
        class="w-full p-2 pl-10 border rounded-lg"
        :class="[inputClass, 'focus:outline-none focus:ring-primary-500 focus:border-primary-500']"
        :style="inputStyle"
      />
      <span v-if="isLoading" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <span
          class="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"
        />
      </span>
    </div>

    <ul
      v-if="hasFocus && (results.length > 0 || !results.length)"
      :style="{ maxHeight: `${maxHeight}px` }"
      class="absolute bg-white border rounded-lg w-full mt-2 z-10 overflow-y-auto transition-[max-height] duration-200 ease-in-out"
      :class="listClass"
    >
      <li
        v-for="(item, index) in results"
        :key="item.id || item.uuid || index"
        @mousedown.prevent="select(item)"
        :class="[
          'p-2 hover:bg-primary-50 cursor-pointer',
          hasDividers && index < results.length - 1 ? 'border-b' : '',
        ]"
      >
        <slot name="result" :item="item">
          {{ item.name }}
        </slot>
      </li>

      <li
        v-if="!results.length"
        @click.prevent
        class="py-8 px-6 text-center text-sm text-slate-500 cursor-default"
      >
        <slot name="no-data">
          <div class="flex flex-col items-center space-y-3">
            <div
              class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shadow-inner"
            >
              <Search class="w-5 h-5 text-slate-400" />
            </div>
            <p>
              {{ localSearchTerm.length < minChars ? helperMessage : noDataMessage }}
            </p>
          </div>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import { Search } from 'lucide-vue-next';
import axios from 'axios';

const props = defineProps({
  mode: { type: String, default: 'local', validator: (v) => ['local', 'remote'].includes(v) },
  apiUrl: { type: String, default: '' },
  onSearch: { type: Function, default: null },
  filterFunction: {
    type: Function,
    default: (term, options) => {
      if (!term || term.length < 2) return [];
      const s = term.toLowerCase();
      return options.filter(
        (item) =>
          item.name.toLowerCase().includes(s) ||
          (item.description && item.description.toLowerCase().includes(s))
      );
    },
  },
  search: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Search...' },
  noDataMessage: { type: String, default: 'No results found' },
  helperMessage: {
    type: String,
    default: () =>
      typeof $t === 'function'
        ? $t('common.minCharsHint', { count: 2 })
        : 'Type at least 2 characters to search',
  },
  hasDividers: { type: Boolean, default: true },
  maxHeight: { type: Number, default: 300 },
  inputClass: { type: [String, Array, Object], default: 'border-secondary-300' },
  inputStyle: { type: Object, default: () => ({}) },
  listClass: { type: [String, Array, Object], default: '' },
  debounce: { type: Number, default: 300 },
  minChars: { type: Number, default: 3 },
  showAllOnFocus: { type: Boolean, default: false },
});

const emit = defineEmits(['update:search', 'select']);

const localSearchTerm = ref(props.search || '');
const results = ref([]);
const hasFocus = ref(false);
const isLoading = ref(false);
const inputRef = ref(null);
let debounceTimeout = null;

const onSearchInput = () => {
  emit('update:search', localSearchTerm.value);
  triggerSearch();
};

const triggerSearch = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async () => {
    if (!localSearchTerm.value || localSearchTerm.value.length < props.minChars) {
      results.value = props.showAllOnFocus ? props.options : [];
      return;
    }

    isLoading.value = true;

    try {
      if (props.onSearch) {
        results.value = await props.onSearch(localSearchTerm.value);
      } else if (props.mode === 'remote' && props.apiUrl) {
        const response = await axios.get(
          `${props.apiUrl}?q=${encodeURIComponent(localSearchTerm.value)}`
        );
        results.value = response.data;
      } else {
        results.value = props.filterFunction(localSearchTerm.value, props.options);
      }
    } catch (err) {
      console.error('Search failed:', err);
      results.value = [];
    } finally {
      isLoading.value = false;
    }
  }, props.debounce);
};

const onFocus = () => {
  hasFocus.value = true;
  if (props.showAllOnFocus) {
    results.value = props.options;
  } else if (props.mode === 'local' && localSearchTerm.value.length >= props.minChars) {
    results.value = props.filterFunction(localSearchTerm.value, props.options);
  }
};

const onBlur = () => {
  setTimeout(() => {
    hasFocus.value = false;
    localSearchTerm.value = '';
    results.value = [];
  }, 200);
};

const select = (item) => {
  emit('select', item);
  localSearchTerm.value = '';
  results.value = [];
  hasFocus.value = false;
  inputRef.value?.blur();
};

watch(
  () => props.options,
  () => {
    if (
      props.mode === 'local' &&
      hasFocus.value &&
      (props.showAllOnFocus || localSearchTerm.value.length >= props.minChars)
    ) {
      results.value = props.showAllOnFocus
        ? props.options
        : props.filterFunction(localSearchTerm.value, props.options);
    }
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
});
</script>
