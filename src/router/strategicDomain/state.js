export const strategicDomainStateRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'strategicDomain.view.pageTitle' : `strategicDomain.${mode}.pageTitle`;

  return [
    {
      path: 'states',
      name: `strategicDomain-${mode}-state`,
      component: () => import('@/views/strategic-domain-state/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
