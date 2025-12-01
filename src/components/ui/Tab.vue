<template>
  <router-link
    :to="to"
    :aria-current="isActive ? 'page' : null"
    class="min-w-[100px] flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-t-lg"
    :class="[isActive ? activeClass : defaultClass]"
  >
    <div class="flex items-center gap-x-1">
      <component v-if="icon" :is="icon" v-bind="iconProps" />
      <slot></slot>
    </div>
  </router-link>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  icon: {
    type: [Object, Function, String],
    default: null,
  },
  iconProps: {
    type: Object,
    default: () => ({ class: 'w-4 h-4' }),
  },
  activeClass: {
    type: String,
    default: 'text-white bg-primary-500',
  },
  defaultClass: {
    type: String,
    default: 'text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200',
  },
  exact: {
    type: Boolean,
    default: false,
  },
  matchPattern: {
    type: RegExp,
    default: null,
  },
});

const route = useRoute();

const isActive = computed(() => {
  const current = route.name;
  const target = typeof props.to === 'string' ? props.to : props.to.name;

  if (!target || !current) return false;

  // Si un pattern de correspondance est fourni, l'utiliser
  if (props.matchPattern) {
    return props.matchPattern.test(current);
  }

  // Si exact est true, vérifier l'égalité exacte
  if (props.exact) {
    return current === target;
  }

  // Sinon, vérifier si la route courante commence par la route cible
  // et s'assurer que c'est bien une correspondance de segment complet
  const targetParts = target.split('-');
  const currentParts = current.split('-');

  return currentParts.slice(0, targetParts.length).join('-') === target;
});
</script>
