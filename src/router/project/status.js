export const projectStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'project.view.pageTitle' : `project.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `project-${mode}-status`,
      component: () => import('@/views/project-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
