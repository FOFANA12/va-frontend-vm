export default [
  {
    path: '/settings/funding-sources',
    name: 'settings-funding-sources',
    component: () => import('@/views/settings/funding-source/FundingSourcePage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.fundingSource.breadActive', to: '/settings/funding-sources' },
      ],
      title: 'settings.fundingSource.pageTitle',
    },
  },
];
