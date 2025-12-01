export const actionPlanningRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'action.view.pageTitle' : `action.${mode}.pageTitle`;

  return [
    {
      path: 'plannings/edit',
      name: `action-${mode}-planning-edit`,
      component: () => import('@/views/action-planning/EditPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'plannings/show',
      name: `action-${mode}-planning-show`,
      component: () => import('@/views/action-planning/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
