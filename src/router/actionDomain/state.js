export const actionDomainStateRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'actionDomain.view.pageTitle' : `actionDomain.${mode}.pageTitle`;

  return [
    {
      path: 'states',
      name: `actionDomain-${mode}-state`,
      component: () => import('@/views/action-domain-state/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
