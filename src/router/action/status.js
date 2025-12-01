export const actionStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'action.view.pageTitle' : `action.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `action-${mode}-status`,
      component: () => import('@/views/action-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
