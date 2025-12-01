export const indicatorControlRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'indicator.view.pageTitle' : `indicator.${mode}.pageTitle`;

  return [
    {
      path: 'controls',
      name: `indicator-${mode}-control`,
      component: () => import('@/views/indicator-control/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'controls/create/:periodId',
      name: `indicator-${mode}-control-create`,
      component: () => import('@/views/indicator-control/CreatePage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'controls/show/:controlId',
      name: `indicator-${mode}-control-show`,
      component: () => import('@/views/indicator-control/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
