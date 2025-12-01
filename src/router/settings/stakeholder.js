export default [
  {
    path: '/settings/stakeholders',
    name: 'settings-stakeholders',
    component: () => import('@/views/settings/stakeholder/StakeholderPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.stakeholder.breadActive', to: '/settings/stakeholders' },
      ],
      title: 'settings.stakeholder.pageTitle',
    },
  },
];
