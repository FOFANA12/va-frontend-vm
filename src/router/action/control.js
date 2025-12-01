export const actionControlRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'action.view.pageTitle' : `action.${mode}.pageTitle`;

  return [
    {
      path: 'controls',
      name: `action-${mode}-control`,
      component: () => import('@/views/action-control/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'controls/create/:periodId',
      name: `action-${mode}-control-create`,
      component: () => import('@/views/action-control/CreatePage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'controls/show/:controlId',
      name: `action-${mode}-control-show`,
      component: () => import('@/views/action-control/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
