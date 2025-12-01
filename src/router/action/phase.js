export const actionPhaseRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'action.view.pageTitle' : `action.${mode}.pageTitle`;

  return [
    {
      path: 'phases',
      name: `action-${mode}-phase`,
      component: () => import('@/views/action-phase/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
