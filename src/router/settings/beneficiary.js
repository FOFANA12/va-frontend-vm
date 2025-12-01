export default [
  {
    path: '/settings/beneficiaries',
    name: 'settings-beneficiaries',
    component: () => import('@/views/settings/beneficiary/BeneficiaryPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.beneficiary.breadActive', to: '/settings/beneficiaries' },
      ],
      title: 'settings.beneficiary.pageTitle',
    },
  },
];
