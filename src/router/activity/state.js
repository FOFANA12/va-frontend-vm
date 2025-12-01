export const activityStateRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'activity.view.pageTitle' : `activity.${mode}.pageTitle`;

  return [
    {
      path: 'states',
      name: `activity-${mode}-state`,
      component: () => import('@/views/activity-state/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
