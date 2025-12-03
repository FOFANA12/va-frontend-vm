export const actionDomainAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'actionDomain.view.pageTitle' : `actionDomain.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `actionDomain-${mode}-attachment`,
      component: () => import('@/views/action-domain/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
