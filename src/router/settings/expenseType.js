export default [
  {
    path: '/settings/expense-types',
    name: 'settings-expense-types',
    component: () => import('@/views/settings/expense-type/ExpenseTypePage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.expenseType.breadActive', to: '/settings/expense-types' },
      ],
      title: 'settings.expenseType.pageTitle',
    },
  },
];
