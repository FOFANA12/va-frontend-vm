export const strategicDomainReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'strategicDomain.view.pageTitle' : `strategicDomain.${mode}.pageTitle`;

  return [
    {
      path: 'performance-report',
      name: `strategicDomain-${mode}-performanceReport`,
      component: () => import('@/views/strategic-Domain-report/PerformanceReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
