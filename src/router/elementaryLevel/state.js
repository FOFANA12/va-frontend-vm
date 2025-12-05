export const elementaryLevelStateRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'elementaryLevel.view.pageTitle' : `elementaryLevel.${mode}.pageTitle`;

  return [
    {
      path: 'states',
      name: `elementaryLevel-${mode}-state`,
      component: () => import('@/views/elementary-level-state/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
