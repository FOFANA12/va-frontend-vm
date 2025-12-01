export const ObjectiveAttachmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'strategicObjective.view.pageTitle' : `strategicObjective.${mode}.pageTitle`;

  return [
    {
      path: 'attachments',
      name: `strategicObjective-${mode}-attachment`,
      component: () => import('@/views/strategic-objective/AttachmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
