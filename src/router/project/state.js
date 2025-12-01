export const projectStateRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'project.view.pageTitle' : `project.${mode}.pageTitle`;

  return [
    {
      path: 'states',
      name: `project-${mode}-state`,
      component: () => import('@/views/project-state/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
