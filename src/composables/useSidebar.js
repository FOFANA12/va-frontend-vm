import { ref, onMounted, onUnmounted, provide, inject } from 'vue';

const SidebarSymbol = Symbol('SidebarContext');

export function useSidebarProvider() {
  const isExpanded = ref(true);
  const isMobileOpen = ref(false);
  const isMobile = ref(false);
  const isHovered = ref(false);
  const activeItem = ref(null);
  const openSubmenu = ref(null);

  function handleResize() {
    const mobile = window.innerWidth < 768;
    isMobile.value = mobile;
    if (!mobile) {
      isMobileOpen.value = false;
    }
  }

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  function toggleSidebar() {
    if (isMobile.value) {
      isMobileOpen.value = !isMobileOpen.value;
    } else {
      isExpanded.value = !isExpanded.value;
    }
  }

  function toggleMobileSidebar() {
    isMobileOpen.value = !isMobileOpen.value;
  }

  function setIsHovered(val) {
    isHovered.value = val;
  }

  function setActiveItem(item) {
    activeItem.value = item;
  }

  function toggleSubmenu(item) {
    openSubmenu.value = openSubmenu.value === item ? null : item;
  }

  const context = {
    isExpanded,
    isMobileOpen,
    isMobile,
    isHovered,
    activeItem,
    openSubmenu,
    toggleSidebar,
    toggleMobileSidebar,
    setIsHovered,
    setActiveItem,
    toggleSubmenu,
  };

  provide(SidebarSymbol, context);
  return context;
}

export function useSidebar() {
  const context = inject(SidebarSymbol);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
