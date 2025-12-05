export const elementaryLevelStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'elementaryLevel.view.pageTitle' : `elementaryLevel.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `elementaryLevel-${mode}-status`,
      component: () => import('@/views/elementary-level-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
