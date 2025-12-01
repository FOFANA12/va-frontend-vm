export const objectiveDecisionRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'strategicObjective.view.pageTitle' : `strategicObjective.${mode}.pageTitle`;

  return [
    {
      path: 'decisions',
      name: `strategicObjective-${mode}-decision`,
      component: () => import('@/views/objective-decision/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/create',
      name: `strategicObjective-${mode}-decision-create`,
      component: () => import('@/views/objective-decision/CreatePage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/edit/:decisionId',
      name: `strategicObjective-${mode}-decision-edit`,
      component: () => import('@/views/objective-decision/EditPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'decisions/show/:decisionId',
      name: `strategicObjective-${mode}-decision-show`,
      component: () => import('@/views/objective-decision/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
