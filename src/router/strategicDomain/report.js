export const strategicDomainReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'strategicDomain.view.pageTitle' : `strategicDomain.${mode}.pageTitle`;

  return [
    {
      path: 'report',
      name: `strategicDomain-${mode}-report`,
      component: () => import('@/views/strategic-Domain-report/ReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
