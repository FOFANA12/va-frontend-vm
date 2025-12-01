export default [
  {
    path: '/settings/currencies',
    name: 'settings-currencies',
    component: () => import('@/views/settings/currency/CurrencyPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.currency.breadActive', to: '/settings/currencies' },
      ],
      title: 'settings.currency.pageTitle',
    },
  },
];
