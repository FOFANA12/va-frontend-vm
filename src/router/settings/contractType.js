export default [
  {
    path: '/settings/contract-types',
    name: 'settings-contract-types',
    component: () => import('@/views/settings/contract-type/ContractTypePage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.contractType.breadActive', to: '/settings/contract-types' },
      ],
      title: 'settings.contractType.pageTitle',
    },
  },
];
