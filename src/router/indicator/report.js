export const indicatorReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'indicator.view.pageTitle' : `indicator.${mode}.pageTitle`;

  return [
    {
      path: 'performance-report',
      name: `indicator-${mode}-performanceReport`,
      component: () => import('@/views/indicator-report/PerformanceReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
