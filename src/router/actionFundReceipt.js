export default [
  {
    path: '/action-fund-receipts',
    name: 'action-fund-receipt',
    component: () => import('@/views/action-fund-receipt/ListPage.vue'),
    meta: {
      auth: true,
      title: 'actionFundReceipt.list.pageTitle',
    },
  },
  {
    path: '/action-fund-receipts/create',
    name: 'action-fund-receipt-create',
    component: () => import('@/views/action-fund-receipt/CreatePage.vue'),
    meta: {
      auth: true,
      title: 'actionFundReceipt.create.pageTitle',
    },
  },
  {
    path: '/action-fund-receipts/edit/:id',
    name: 'action-fund-receipt-edit',
    component: () => import('@/views/action-fund-receipt/EditPage.vue'),
    meta: {
      auth: true,
      title: 'actionFundReceipt.edit.pageTitle',
    },
  },
  {
    path: '/action-fund-receipts/show/:id',
    name: 'action-fund-receipt-show',
    component: () => import('@/views/action-fund-receipt/ViewPage.vue'),
    meta: {
      auth: true,
      title: 'actionFundReceipt.view.pageTitle',
    },
  },
];
