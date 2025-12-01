export default [
  {
    path: '/action-plans',
    name: 'action-plans',
    component: () => import('@/views/action-plan/ActionPlanPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.operationalManagement', disabled: true, to: null },
        { title: 'sidebar.actionPlans', disabled: true },
        { title: 'actionPlan.breadActive', disabled: true },
      ],
      title: 'actionPlan.pageTitle',
    },
  },
];
