export const objectiveAlignmentRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'strategicObjective.view.pageTitle' : `strategicObjective.${mode}.pageTitle`;

  return [
    {
      path: 'alignments',
      name: `strategicObjective-${mode}-alignment`,
      component: () => import('@/views/strategic-objective-alignment/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'alignments/create',
      name: `strategicObjective-${mode}-alignment-create`,
      component: () => import('@/views/strategic-objective-alignment/AlignmentPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
