export const projectAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'project.view.pageTitle' : `project.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `project-${mode}-attachment`,
      component: () => import('@/views/project/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
