export default [
  {
    path: '/settings/delegated-project-owners',
    name: 'settings-delegated-project-owners',
    component: () => import('@/views/settings/delegated-project-owner/DelegatedProjectOwnerPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.delegatedProjectOwner.breadActive', to: '/settings/delegated-project-owners' },
      ],
      title: 'settings.delegatedProjectOwner.pageTitle',
    },
  },
];
