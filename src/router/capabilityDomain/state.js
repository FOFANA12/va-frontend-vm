export const capabilityDomainStateRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'capabilityDomain.view.pageTitle' : `capabilityDomain.${mode}.pageTitle`;

  return [
    {
      path: 'states',
      name: `capabilityDomain-${mode}-state`,
      component: () => import('@/views/capability-domain-state/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
