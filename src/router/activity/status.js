export const activityStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'activity.view.pageTitle' : `activity.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `activity-${mode}-status`,
      component: () => import('@/views/activity-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
