export const strategicDomainAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'strategicDomain.view.pageTitle' : `strategicDomain.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `strategicDomain-${mode}-attachment`,
      component: () => import('@/views/strategic-domain/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
