export const indicatorAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'indicator.view.pageTitle' : `indicator.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `indicator-${mode}-attachment`,
      component: () => import('@/views/indicator/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
