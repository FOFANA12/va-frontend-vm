export const capabilityDomainStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'capabilityDomain.view.pageTitle' : `capabilityDomain.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `capabilityDomain-${mode}-status`,
      component: () => import('@/views/capability-domain-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
