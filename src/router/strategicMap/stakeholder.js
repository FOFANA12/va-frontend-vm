export const stakeholderRoutes = (mode = 'show') => {
  const pageTitleKey = 'strategicMap.details.pageTitle';

  return [
    {
      path: 'stakeholders',
      name: `strategicMap-${mode}-stakeholder`,
      component: () => import('@/views/strategic-stakeholder/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
