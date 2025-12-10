export const actionDomainReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'actionDomain.view.pageTitle' : `actionDomain.${mode}.pageTitle`;

  return [
    {
      path: 'performance-report',
      name: `actionDomain-${mode}-performanceReport`,
      component: () => import('@/views/action-Domain-report/PerformanceReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
