export const capabilityDomainReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'capabilityDomain.view.pageTitle' : `capabilityDomain.${mode}.pageTitle`;

  return [
    {
      path: 'report',
      name: `capabilityDomain-${mode}-report`,
      component: () => import('@/views/capability-Domain-report/ReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
