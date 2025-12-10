export const capabilityDomainReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'capabilityDomain.view.pageTitle' : `capabilityDomain.${mode}.pageTitle`;

  return [
    {
      path: 'performance-report',
      name: `capabilityDomain-${mode}-performanceReport`,
      component: () => import('@/views/capability-Domain-report/PerformanceReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
