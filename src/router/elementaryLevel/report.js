export const elementaryLevelReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'elementaryLevel.view.pageTitle' : `elementaryLevel.${mode}.pageTitle`;

  return [
    {
      path: 'report',
      name: `elementaryLevel-${mode}-report`,
      component: () => import('@/views/elementary-level-report/ReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
