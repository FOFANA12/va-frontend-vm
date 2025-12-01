<script setup>
import { Teleport, ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { EllipsisVertical } from 'lucide-vue-next';

const props = defineProps({
  options: { type: Array, required: true },
  onSelect: Function,
  width: { type: [String, Number], default: 'w-56' },
});

const showMenu = ref(false);
const menuRef = ref(null);
const buttonRef = ref(null);
const menuPosition = ref({ top: 0, left: 0 });

const dropdownWidth = computed(() => {
  if (typeof props.width === 'number') return props.width + 'px';
  return null;
});

const toggleMenu = async () => {
  if (!showMenu.value) {
    showMenu.value = true;
    await nextTick();
    updateMenuPosition();
  } else {
    showMenu.value = false;
  }
};

const updateMenuPosition = () => {
  if (buttonRef.value) {
    const rect = buttonRef.value.getBoundingClientRect();
    const menuWidth = typeof props.width === 'number' ? props.width : 250;
    menuPosition.value = {
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX - menuWidth + rect.width,
    };
  }
};

const closeMenu = () => (showMenu.value = false);

const handleClickOutside = (event) => {
  if (
    menuRef.value &&
    !menuRef.value.contains(event.target) &&
    buttonRef.value &&
    !buttonRef.value.contains(event.target)
  ) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', updateMenuPosition, true);
  window.addEventListener('resize', updateMenuPosition);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', updateMenuPosition, true);
  window.removeEventListener('resize', updateMenuPosition);
});
</script>

<template>
  <div class="relative" ref="menuRef">
    <button
      ref="buttonRef"
      @click="toggleMenu"
      class="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
      :class="{ 'bg-gray-100 text-gray-700': showMenu }"
    >
      <EllipsisVertical class="h-4 w-4" />
    </button>

    <Teleport to="body">
      <div
        v-if="showMenu"
        class="fixed bg-white border border-gray-200 rounded-lg z-[9999]"
        :class="typeof width === 'string' ? width : ''"
        :style="{
          top: menuPosition.top + 'px',
          left: menuPosition.left + 'px',
          width: dropdownWidth || undefined,
        }"
      >
        <div class="py-1">
          <button
            v-for="opt in props.options"
            :key="opt.value"
            @click="
              () => {
                props.onSelect?.(opt.value);
                closeMenu();
              }
            "
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center"
          >
            <div class="w-2 h-2 rounded-full mr-3" :class="opt.color"></div>
            {{ opt.label }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
