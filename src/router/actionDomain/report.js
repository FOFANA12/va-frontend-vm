export const actionDomainReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'actionDomain.view.pageTitle' : `actionDomain.${mode}.pageTitle`;

  return [
    {
      path: 'report',
      name: `actionDomain-${mode}-report`,
      component: () => import('@/views/action-Domain-report/ReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
