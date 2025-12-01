export const programAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'program.view.pageTitle' : `program.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `program-${mode}-attachment`,
      component: () => import('@/views/program/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
