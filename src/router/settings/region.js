export default [
  {
    path: '/settings/regions',
    name: 'settings-regions',
    component: () => import('@/views/settings/region/RegionPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.region.breadActive', to: '/settings/regions' },
      ],
      title: 'settings.region.pageTitle',
    },
  },
];
