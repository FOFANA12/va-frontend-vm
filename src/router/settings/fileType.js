export default [
  {
    path: '/settings/file-types',
    name: 'settings-file-types',
    component: () => import('@/views/settings/file-type/FileTypePage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.fileType.breadActive', to: '/settings/file-types' },
      ],
      title: 'settings.fileType.pageTitle',
    },
  },
];
