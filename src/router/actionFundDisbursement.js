export default [
  {
    path: '/action-fund-disbursements',
    name: 'action-fund-disbursement',
    component: () => import('@/views/action-fund-disbursement/ListPage.vue'),
    meta: {
      auth: true,
      title: 'actionFundDisbursement.list.pageTitle',
    },
  },
  {
    path: '/action-fund-disbursements/create',
    name: 'action-fund-disbursement-create',
    component: () => import('@/views/action-fund-disbursement/CreatePage.vue'),
    meta: {
      auth: true,
      title: 'actionFundDisbursement.create.pageTitle',
    },
  },
  {
    path: '/action-fund-disbursements/edit/:id',
    name: 'action-fund-disbursement-edit',
    component: () => import('@/views/action-fund-disbursement/EditPage.vue'),
    meta: {
      auth: true,
      title: 'actionFundDisbursement.edit.pageTitle',
    },
  },
  {
    path: '/action-fund-disbursements/show/:id',
    name: 'action-fund-disbursement-show',
    component: () => import('@/views/action-fund-disbursement/ViewPage.vue'),
    meta: {
      auth: true,
      title: 'actionFundDisbursement.view.pageTitle',
    },
  },
];
