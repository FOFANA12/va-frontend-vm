export const programStateRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'actionDomain.view.pageTitle' : `actionDomain.${mode}.pageTitle`;

  return [
    {
      path: 'states',
      name: `actionDomain-${mode}-state`,
      component: () => import('@/views/program-state/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
