export const capabilityDomainAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'capabilityDomain.view.pageTitle' : `capabilityDomain.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `capabilityDomain-${mode}-attachment`,
      component: () => import('@/views/capability-domain/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
