export default [
  {
    path: '/settings/procurement-modes',
    name: 'settings-procurement-modes',
    component: () => import('@/views/settings/procurement-mode/ProcurementModePage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.procurementMode.breadActive', to: '/settings/procurement-modes' },
      ],
      title: 'settings.procurementMode.pageTitle',
    },
  },
];
