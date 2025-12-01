export const attachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'supplier.view.pageTitle' : `supplier.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `supplier-${mode}-attachment`,
      component: () => import('@/views/supplier/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
