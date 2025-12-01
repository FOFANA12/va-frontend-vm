export const activityAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'activity.view.pageTitle' : `activity.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `activity-${mode}-attachment`,
      component: () => import('@/views/activity/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
