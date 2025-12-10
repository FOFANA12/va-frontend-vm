export const elementaryLevelReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'elementaryLevel.view.pageTitle' : `elementaryLevel.${mode}.pageTitle`;

  return [
    {
      path: 'performance-report',
      name: `elementaryLevel-${mode}-performanceReport`,
      component: () => import('@/views/elementary-level-report/PerformanceReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
