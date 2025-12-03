export const programStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'actionDomain.view.pageTitle' : `actionDomain.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `actionDomain-${mode}-status`,
      component: () => import('@/views/program-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
