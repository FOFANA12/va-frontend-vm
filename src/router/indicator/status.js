export const indicatorStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'indicator.view.pageTitle' : `indicator.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `indicator-${mode}-status`,
      component: () => import('@/views/indicator-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
