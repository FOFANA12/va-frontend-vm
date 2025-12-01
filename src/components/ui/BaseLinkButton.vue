<template>
  <component
    :is="newTab ? 'a' : RouterLink"
    v-bind="linkProps"
    :class="[
      'flex items-center py-2 px-3 rounded-lg transition-colors text-sm',
      variantClasses,
      customClass,
    ]"
    :target="newTab ? '_blank' : null"
    :rel="newTab ? 'noopener noreferrer' : null"
  >
    <component v-if="icon" :is="icon" class="w-4 h-4 mr-1" />
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
  variant: {
    type: String,
    default: null,
  },
  customClass: {
    type: String,
    default: '',
  },
  newTab: {
    // 👈 nouvelle prop
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const linkProps = computed(() => {
  if (props.newTab) {
    return { href: router.resolve(props.to).href };
  }
  return { to: props.to };
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-500 text-white hover:bg-primary-600 border border-transparent';
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600 border border-transparent';
    case 'danger-outline':
      return 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white';
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-transparent';
    default:
      return '';
  }
});
</script>
