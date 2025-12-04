import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore, useSettingsCurrencyStore } from '@/store';

import AuthRoutes from './auth';
import EmployeeRoutes from './employee';
import SupplierRoutes from './supplier';
import StrategicMapRoutes from './strategicMap';
import StrategicLeverRoutes from './strategicLever';
import StrategicAxisRoutes from './strategicAxis';
import StrategicObjectiveRoutes from './strategicObjective';
import ActionPlanRoutes from './actionPlan';
import ActionRoutes from './action';
import IndicatorRoutes from './indicator';
import ActionFundReceiptRoutes from './actionFundReceipt';
import ActionFundDisbursementRoutes from './actionFundDisbursement';
import LogActivityRoutes from './logActivity';
import SettingsRoutes from './settings';
import StructureRoutes from './structure';
import ActionDomainRoutes from './actionDomain';
import StrategicDomainRoutes from './strategicDomain';
import CapabilityDomainRoutes from './capabilityDomain';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { title: 'dashboard.pageTitle', auth: true },
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/report/ReportPage.vue'),
    meta: { title: 'report.pageTitle', auth: true },
  },
  ...AuthRoutes,
  ...EmployeeRoutes,
  ...SupplierRoutes,
  ...StructureRoutes,
  ...ActionDomainRoutes,
  ...StrategicDomainRoutes,
  ...CapabilityDomainRoutes,
  ...StrategicMapRoutes,
  ...StrategicLeverRoutes,
  ...StrategicAxisRoutes,
  ...StrategicObjectiveRoutes,
  ...ActionPlanRoutes,
  ...ActionRoutes,
  ...IndicatorRoutes,
  ...ActionFundReceiptRoutes,
  ...ActionFundDisbursementRoutes,
  ...LogActivityRoutes,
  ...SettingsRoutes,
  {
    path: '/not-authorized',
    component: () => import('@/views/errors/NotAuthorizedPage.vue'),
    name: 'not-authorized',
    meta: {
      title: 'notAuthorized.pageTitle',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/errors/NotFoundPage.vue'),
    name: 'not-found',
    meta: {
      title: 'notFound.pageTitle',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const currencyStore = useSettingsCurrencyStore();

  const publicPages = ['login', 'forgot-password', 'reset-password'];
  const requiresAuth = to.matched.some((record) => record.meta.auth);
  const requiredPermissions = to.meta.requiredPermissions || [];

  try {
    // Check user only if app not initialized
    if (!authStore.isInitialized) {
      await authStore.checkUser();
    }

    if (!currencyStore.defaultCurrency) {
      await currencyStore.getDefaultCurrency();
    }
  } catch (error) {
    console.warn('User session could not be restored.', error);
  }

  // If route requires auth and user is not authenticated
  if (requiresAuth && !authStore.isAuthenticated) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  }

  // If user is authenticated but tries to access a public page
  if (!requiresAuth && publicPages.includes(to.name) && authStore.isAuthenticated) {
    return next({ name: 'dashboard' });
  }

  // If route requires specific permissions
  if (requiredPermissions.length > 0 && authStore.isAuthenticated) {
    const userPermissions = authStore.user?.permissions || [];

    const hasAnyPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasAnyPermission) {
      return next({ name: 'not-authorized' });
    }
  }

  next();
});

export default router;
