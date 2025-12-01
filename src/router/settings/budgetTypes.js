export default [
  {
    path: '/settings/budget-types',
    name: 'settings-budget-types',
    component: () => import('@/views/settings/budget-type/BudgetTypePage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.budgetType.breadActive', to: '/settings/budget-types' },
      ],
      title: 'settings.budgetType.pageTitle',
    },
  },
];
