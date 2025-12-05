export const elementaryLevelAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'elementaryLevel.view.pageTitle' : `elementaryLevel.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `elementaryLevel-${mode}-attachment`,
      component: () => import('@/views/elementary-level/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
