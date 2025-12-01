export const programStateRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'program.view.pageTitle' : `program.${mode}.pageTitle`;

  return [
    {
      path: 'states',
      name: `program-${mode}-state`,
      component: () => import('@/views/program-state/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
