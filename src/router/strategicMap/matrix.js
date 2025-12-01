export const matrixRoutes = (mode = 'show') => {
  const pageTitleKey = 'strategicMap.details.pageTitle';

  return [
    {
      path: 'matrix',
      name: `strategicMap-${mode}-matrix`,
      component: () => import('@/views/matrix/Matrix.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
