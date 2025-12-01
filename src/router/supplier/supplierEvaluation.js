export const supplierEvaluationRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'supplier.view.pageTitle' : `supplier.${mode}.pageTitle`;

  return [
    {
      path: 'evaluations',
      name: `supplier-${mode}-evaluation`,
      component: () => import('@/views/supplier-evaluation/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'evaluations/create',
      name: `supplier-${mode}-evaluation-create`,
      component: () => import('@/views/supplier-evaluation/CreatePage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'evaluations/edit/:supplierEvaluationId',
      name: `supplier-${mode}-evaluation-edit`,
      component: () => import('@/views/supplier-evaluation/EditPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'evaluations/show/:supplierEvaluationId',
      name: `supplier-${mode}-evaluation-show`,
      component: () => import('@/views/supplier-evaluation/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
