<template>
  <aside
    :class="[
      'flex flex-col bg-white text-gray-900 h-full transition-all duration-300 ease-in-out border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[70px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <nav class="py-1 pb-6 flex flex-col overflow-y-auto no-scrollbar">
      <div class="flex flex-col gap-2">
        <template v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
          <!-- Title with divider -->
          <div v-if="menuGroup.title" class="flex items-center text-xs text-gray-400">
            <span
              v-if="isExpanded || isHovered || isMobileOpen"
              :class="['pl-5 whitespace-nowrap pr-2', menuGroup.titleClass]"
            >
              {{ menuGroup.title }}
            </span>
            <hr class="flex-grow border-t border-gray-200" />
          </div>

          <!-- Menu items -->
          <ul class="flex flex-col gap-1">
            <li v-for="(item, index) in menuGroup.items" :key="item.name">
              <router-link
                :to="item.path"
                :class="[
                  'menu-item group px-5',
                  {
                    'menu-item-active': isActive(item.path),
                    'menu-item-inactive': !isActive(item.path),
                  },
                ]"
              >
                <span
                  :class="[
                    isActive(item.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive',
                  ]"
                >
                  <component :is="item.icon" />
                </span>
                <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">
                  {{ item.name }}
                </span>
              </router-link>
            </li>
          </ul>
        </template>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import {
  LayoutDashboard,
  Banknote,
  ClipboardList,
  Users,
  Building,
  UserCog,
  Users2,
  Coins,
  Folders,
  Layers,
  FolderCog,
  Flag,
  MapIcon,
  FileSignature,
  Building2Icon,
  Activity,
  HandHelping,
  ListChecks,
  Wallet,
  BriefcaseBusiness,
  PieChart,
  ArrowDownCircle,
  ReceiptCent,
  Navigation,
  Target,
  TrendingUp,
  Tags,
  FileText,
  BarChart,
  Contact,
  ListOrdered,
  Sliders,
  ShieldCheck,
} from 'lucide-vue-next';
import { useSidebar } from '@/composables/useSidebar';
import PERMISSIONS from '@/constants/permissions';
import { usePermission } from '@/composables/usePermissions';
const { hasPermission, hasAnyPermission } = usePermission();

const { t } = useI18n();
const route = useRoute();
const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();

const settingsPermissions = [
  PERMISSIONS.ACCESS_CURRENCIES,
  PERMISSIONS.ACCESS_DEFAULT_PHASES,
  PERMISSIONS.ACCESS_FILE_TYPES,
  PERMISSIONS.ACCESS_CONTRACT_TYPES,
  PERMISSIONS.ACCESS_PROCUREMENT_MODES,
  PERMISSIONS.ACCESS_PROJECT_OWNERS,
  PERMISSIONS.ACCESS_DELEGATED_PROJECT_OWNERS,
  PERMISSIONS.ACCESS_FUNDING_SOURCES,
  PERMISSIONS.ACCESS_REGIONS,
  PERMISSIONS.ACCESS_DEPARTMENTS,
  PERMISSIONS.ACCESS_MUNICIPALITIES,
  PERMISSIONS.ACCESS_BENEFICIARIES,
  PERMISSIONS.ACCESS_PAYMENT_MODES,
  PERMISSIONS.ACCESS_BUDGET_TYPES,
  PERMISSIONS.ACCESS_EXPENSE_TYPES,
  PERMISSIONS.ACCESS_INDICATOR_CATEGORIES,
  PERMISSIONS.ACCESS_USERS,
  PERMISSIONS.ACCESS_ROLES,
];

const rawMenuGroups = [
  {
    items: [{ icon: LayoutDashboard, name: t('sidebar.dashboard'), path: '/' }],
  },
  {
    title: t('sidebar.strategicManagement'),
    titleClass: 'text-primary-600 font-bold uppercase',
    items: [
      {
        icon: MapIcon,
        name: t('sidebar.strategicMaps'),
        path: '/strategic-maps',
        permission: PERMISSIONS.ACCESS_STRATEGIC_MAPS,
      },
      {
        icon: Sliders,
        name: t('sidebar.strategicLevers'),
        path: '/strategic-levers',
        permission: PERMISSIONS.ACCESS_STRATEGIC_LEVERS,
      },
      {
        icon: Navigation,
        name: t('sidebar.strategicAxes'),
        path: '/strategic-axes',
        permission: PERMISSIONS.ACCESS_STRATEGIC_AXES,
      },
      {
        icon: Target,
        name: t('sidebar.strategicObjectives'),
        path: '/strategic-objectives',
        permission: PERMISSIONS.ACCESS_STRATEGIC_OBJECTIVES,
      },
      {
        icon: TrendingUp,
        name: t('sidebar.indicators'),
        path: '/indicators',
        permission: PERMISSIONS.ACCESS_INDICATORS,
      },
    ],
  },
  {
    title: t('sidebar.operationalManagement'),
    titleClass: 'text-primary-600 font-bold uppercase',
    items: [
      {
        icon: ClipboardList,
        name: t('sidebar.actionPlans'),
        path: '/action-plans',
        permission: PERMISSIONS.ACCESS_ACTION_PLANS,
      },
      {
        icon: ListChecks,
        name: t('sidebar.actions'),
        path: '/actions',
        permission: PERMISSIONS.ACCESS_ACTIONS,
      },
    ],
  },
  {
    title: t('sidebar.financialManagement'),
    titleClass: 'text-primary-600 font-bold uppercase',
    items: [
      {
        icon: Contact,
        name: t('sidebar.suppliers'),
        path: '/suppliers',
        permission: PERMISSIONS.ACCESS_SUPPLIERS,
      },
      {
        icon: ReceiptCent,
        name: t('sidebar.actionFundReceipts'),
        path: '/action-fund-receipts',
        permission: PERMISSIONS.ACCESS_FUND_RECEIPTS,
      },
      {
        icon: ArrowDownCircle,
        name: t('sidebar.actionFundDisbursements'),
        path: '/action-fund-disbursements',
        permission: PERMISSIONS.ACCESS_FUND_DISBURSEMENTS,
      },
    ],
  },
  {
    title: t('sidebar.organizationalManagement'),
    titleClass: 'text-primary-600 font-bold uppercase',
    items: [
      {
        icon: Building,
        name: t('sidebar.structures'),
        path: '/structures',
        permission: PERMISSIONS.ACCESS_STRUCTURES,
      },
      {
        icon: Users2,
        name: t('sidebar.employees'),
        path: '/employees',
        permission: PERMISSIONS.ACCESS_EMPLOYEES,
      },
    ],
  },
  {
    title: t('sidebar.maillage'),
    titleClass: 'text-primary-600 font-bold uppercase',
    items: [
      {
        icon: Layers,
        name: t('sidebar.actionDomains'),
        path: '/action-domains',
        permission: PERMISSIONS.ACCESS_PROGRAMS,
      },
      {
        icon: FolderCog,
        name: t('sidebar.projects'),
        path: '/projects',
        permission: PERMISSIONS.ACCESS_PROJECTS,
      },
      {
        icon: Activity,
        name: t('sidebar.activities'),
        path: '/activities',
        permission: PERMISSIONS.ACCESS_ACTIVITIES,
      },
    ],
  },
  {
    title: t('sidebar.monitoring'),
    titleClass: 'text-primary-600 font-bold uppercase',
    items: [
      {
        icon: BarChart,
        name: t('sidebar.reports'),
        path: '/reports',
        permission: PERMISSIONS.ACCESS_REPORTING,
      },
      {
        icon: FileText,
        name: t('sidebar.logActivities'),
        path: '/log-activities',
        permission: PERMISSIONS.ACCESS_LOGS,
      },
    ],
  },
  {
    title: t('sidebar.settings.title'),
    titleClass: 'text-primary-600 font-bold uppercase',
    requiredPermissions: settingsPermissions,
    items: [
      {
        icon: Coins,
        name: t('sidebar.settings.currencies'),
        path: '/settings/currencies',
        permission: PERMISSIONS.ACCESS_CURRENCIES,
      },
      {
        icon: ListOrdered,
        name: t('sidebar.settings.defaultPhases'),
        path: '/settings/default-phases',
        permission: PERMISSIONS.ACCESS_DEFAULT_PHASES,
      },
      {
        icon: ListOrdered,
        name: t('sidebar.settings.fileTypes'),
        path: '/settings/file-types',
        permission: PERMISSIONS.ACCESS_FILE_TYPES,
      },
      {
        icon: FileSignature,
        name: t('sidebar.settings.contractTypes'),
        path: '/settings/contract-types',
        permission: PERMISSIONS.ACCESS_CONTRACT_TYPES,
      },
      {
        icon: Folders,
        name: t('sidebar.settings.procurementModes'),
        path: '/settings/procurement-modes',
        permission: PERMISSIONS.ACCESS_PROCUREMENT_MODES,
      },
      {
        icon: Users,
        name: t('sidebar.settings.projectOwners'),
        path: '/settings/project-owners',
        permission: PERMISSIONS.ACCESS_PROJECT_OWNERS,
      },
      {
        icon: UserCog,
        name: t('sidebar.settings.delegatedProjectOwners'),
        path: '/settings/delegated-project-owners',
        permission: PERMISSIONS.ACCESS_DELEGATED_PROJECT_OWNERS,
      },
      {
        icon: Banknote,
        name: t('sidebar.settings.fundingSources'),
        path: '/settings/funding-sources',
        permission: PERMISSIONS.ACCESS_FUNDING_SOURCES,
      },
      {
        icon: Flag,
        name: t('sidebar.settings.regions'),
        path: '/settings/regions',
        permission: PERMISSIONS.ACCESS_REGIONS,
      },
      {
        icon: MapIcon,
        name: t('sidebar.settings.departments'),
        path: '/settings/departments',
        permission: PERMISSIONS.ACCESS_DEPARTMENTS,
      },
      {
        icon: Building2Icon,
        name: t('sidebar.settings.municipalities'),
        path: '/settings/municipalities',
        permission: PERMISSIONS.ACCESS_MUNICIPALITIES,
      },
      {
        icon: HandHelping,
        name: t('sidebar.settings.beneficiaries'),
        path: '/settings/beneficiaries',
        permission: PERMISSIONS.ACCESS_BENEFICIARIES,
      },
      {
        icon: Wallet,
        name: t('sidebar.settings.paymentModes'),
        path: '/settings/payment-modes',
        permission: PERMISSIONS.ACCESS_PAYMENT_MODES,
      },
      {
        icon: PieChart,
        name: t('sidebar.settings.budgetTypes'),
        path: '/settings/budget-types',
        permission: PERMISSIONS.ACCESS_BUDGET_TYPES,
      },
      {
        icon: BriefcaseBusiness,
        name: t('sidebar.settings.expenseTypes'),
        path: '/settings/expense-types',
        permission: PERMISSIONS.ACCESS_EXPENSE_TYPES,
      },
      {
        icon: Tags,
        name: t('sidebar.settings.indicatorCategories'),
        path: '/settings/indicator-categories',
        permission: PERMISSIONS.ACCESS_INDICATOR_CATEGORIES,
      },
      {
        icon: UserCog,
        name: t('sidebar.settings.users'),
        path: '/settings/users',
        permission: PERMISSIONS.ACCESS_USERS,
      },
      {
        icon: ShieldCheck,
        name: t('sidebar.settings.roles'),
        path: '/settings/roles',
        permission: PERMISSIONS.ACCESS_ROLES,
      },
    ],
  },
];

const menuGroups = computed(() =>
  rawMenuGroups
    .map((group) => {
      if (group.requiredPermissions && !hasAnyPermission(group.requiredPermissions)) {
        return { ...group, items: [] };
      }

      return {
        ...group,
        items: group.items.filter((item) => !item.permission || hasPermission(item.permission)),
      };
    })
    .filter((group) => group.items.length > 0)
);

const isActive = (path) => route.path === path;

watch(
  () => route.path,
  (newPath) => {
    let found = false;
    for (let g = 0; g < menuGroups.value.length; g++) {
      const group = menuGroups.value[g];
      for (let i = 0; i < group.items.length; i++) {
        const item = group.items[i];
        if (item.path === newPath) {
          openSubmenu.value = `${g}-${i}`;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) openSubmenu.value = null;
  },
  { immediate: true }
);
</script>

