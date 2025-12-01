export const actionAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'action.view.pageTitle' : `action.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `action-${mode}-attachment`,
      component: () => import('@/views/action/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
