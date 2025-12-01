export default [
  {
    path: '/settings/default-phases',
    name: 'settings-default-phases',
    component: () => import('@/views/settings/default-phase/ListPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.defaultPhase.breadActive', to: '/settings/default-phases' },
      ],
      title: 'settings.defaultPhase.pageTitle',
    },
  },
];
