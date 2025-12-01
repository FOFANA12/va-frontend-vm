export const contractRoutes = (mode = 'edit') => {
  const pageTitleKey = mode === 'show' ? 'supplier.view.pageTitle' : `supplier.${mode}.pageTitle`;

  return [
    {
      path: 'contracts',
      name: `supplier-${mode}-contract`,
      component: () => import('@/views/supplier-contract/ListPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'contracts/create',
      name: `supplier-${mode}-contract-create`,
      component: () => import('@/views/supplier-contract/CreatePage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'contracts/edit/:contractId',
      name: `supplier-${mode}-contract-edit`,
      component: () => import('@/views/supplier-contract/EditPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
    {
      path: 'contracts/show/:contractId',
      name: `supplier-${mode}-contract-show`,
      component: () => import('@/views/supplier-contract/ViewPage.vue'),
      meta: { auth: true, title: pageTitleKey },
    },
  ];
};
