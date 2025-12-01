export default [
  {
    path: '/settings/project-owners',
    name: 'settings-project-owners',
    component: () => import('@/views/settings/project-owner/ProjectOwnerPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.projectOwner.breadActive', to: '/settings/project-owners' },
      ],
      title: 'settings.projectOwner.pageTitle',
    },
  },
];
