export default [
  {
    path: '/settings/municipalities',
    name: 'settings-municipalities',
    component: () => import('@/views/settings/municipality/MunicipalityPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.municipality.breadActive', to: '/settings/municipalities' },
      ],
      title: 'settings.municipality.pageTitle',
    },
  },
];
