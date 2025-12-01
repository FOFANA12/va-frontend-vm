export const indicatorDecisionRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'indicator.view.pageTitle' : `indicator.${mode}.pageTitle`;

  return [
    {
      path: 'decisions',
      name: `indicator-${mode}-decision`,
      component: () => import('@/views/indicator-decision/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/create',
      name: `indicator-${mode}-decision-create`,
      component: () => import('@/views/indicator-decision/CreatePage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/edit/:decisionId',
      name: `indicator-${mode}-decision-edit`,
      component: () => import('@/views/indicator-decision/EditPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/show/:decisionId',
      name: `indicator-${mode}-decision-show`,
      component: () => import('@/views/indicator-decision/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
