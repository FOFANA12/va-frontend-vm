export const actionReportRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'action.view.pageTitle' : `action.${mode}.pageTitle`;

  return [
    {
      path: 'performance-report',
      name: `action-${mode}-performanceReport`,
      component: () => import('@/views/action-report/PerformanceReportPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
