export const strategicDomainStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'strategicDomain.view.pageTitle' : `strategicDomain.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `strategicDomain-${mode}-status`,
      component: () => import('@/views/strategic-domain-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
