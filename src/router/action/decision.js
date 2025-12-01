export const actionDecisionRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'action.view.pageTitle' : `action.${mode}.pageTitle`;

  return [
    {
      path: 'decisions',
      name: `action-${mode}-decision`,
      component: () => import('@/views/action-decision/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/create',
      name: `action-${mode}-decision-create`,
      component: () => import('@/views/action-decision/CreatePage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/edit/:decisionId',
      name: `action-${mode}-decision-edit`,
      component: () => import('@/views/action-decision/EditPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/show/:decisionId',
      name: `action-${mode}-decision-show`,
      component: () => import('@/views/action-decision/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
