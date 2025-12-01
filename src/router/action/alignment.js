export const actionAlignmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'action.view.pageTitle' : `action.${mode}.pageTitle`;

  return [
    {
      path: 'alignments',
      name: `action-${mode}-alignment`,
      component: () => import('@/views/action-alignment/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'alignments/create',
      name: `action-${mode}-alignment-create`,
      component: () => import('@/views/action-alignment/AlignmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
