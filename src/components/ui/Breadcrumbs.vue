<template>
  <div class="card p-0 flex flex-col">
    <h1 v-if="pageTitle" class="text-gray-600 text-xl font-semibold mb-1">
      {{ pageTitle }}
    </h1>

    <nav class="flex items-center flex-wrap text-sm gap-x-1" aria-label="Breadcrumb">
      <!-- Slot personnalisé -->
      <slot v-if="$slots.default" />

      <!-- Breadcrumbs dynamiques -->
      <template v-else>
        <template v-for="(breadcrumb, index) in translatedBreadcrumbs" :key="index">
          <router-link
            v-if="breadcrumb.to && !breadcrumb.disabled"
            :to="breadcrumb.to"
            class="text-gray-500 font-medium hover:underline flex items-center"
          >
            {{ breadcrumb.title }}
          </router-link>
          <span v-else class="text-gray-500 font-medium">
            {{ breadcrumb.title }}
          </span>

          <!-- Chevron sauf dernier -->
          <ChevronRightIcon
            v-if="index < translatedBreadcrumbs.length - 1"
            class="w-4 h-4 text-gray-400"
          />
        </template>
      </template>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ChevronRight as ChevronRightIcon } from 'lucide-vue-next';

const { t } = useI18n();
const route = useRoute();

const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: null,
  },
  pageTitle: {
    type: String,
    default: null,
  },
});

const translatedBreadcrumbs = computed(() => {
  const source = props.breadcrumbs || route.meta?.breadcrumbs || [];
  return source.map((b) => ({
    title: t(b.title),
    to: b.to,
    disabled: b.disabled,
  }));
});
</script>
