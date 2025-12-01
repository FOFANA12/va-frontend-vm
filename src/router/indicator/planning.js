export const indicatorPlanningRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'indicator.view.pageTitle' : `indicator.${mode}.pageTitle`;

  return [
    {
      path: 'plannings/edit',
      name: `indicator-${mode}-planning-edit`,
      component: () => import('@/views/indicator-planning/EditPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'plannings/show',
      name: `indicator-${mode}-planning-show`,
      component: () => import('@/views/indicator-planning/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
