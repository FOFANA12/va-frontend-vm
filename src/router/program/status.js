export const programStatusRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'program.view.pageTitle' : `program.${mode}.pageTitle`;

  return [
    {
      path: 'statuses',
      name: `program-${mode}-status`,
      component: () => import('@/views/program-status/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
