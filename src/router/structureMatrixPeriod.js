export default [
  {
    path: '/structure-matrix-periods',
    name: 'structure-matrix-period',
    component: () => import('@/views/structure-matrix-period/ListPage.vue'),
    meta: {
      auth: true,
      title: 'structureMatrixPeriod.list.pageTitle',
    },
  },
  {
    path: '/structure-matrix-periods/create',
    name: 'structure-matrix-period-create',
    component: () => import('@/views/structure-matrix-period/CreatePage.vue'),
    meta: {
      auth: true,
      title: 'structureMatrixPeriod.create.pageTitle',
    },
  },
  {
    path: '/structure-matrix-periods/edit/:id',
    name: 'structure-matrix-period-edit',
    component: () => import('@/views/structure-matrix-period/EditPage.vue'),
    meta: {
      auth: true,
      title: 'structureMatrixPeriod.edit.pageTitle',
    },
  },
  {
    path: '/structure-matrix-periods/show/:id',
    name: 'structure-matrix-period-show',
    component: () => import('@/views/structure-matrix-period/ViewPage.vue'),
    meta: {
      auth: true,
      title: 'structureMatrixPeriod.view.pageTitle',
    },
  },
];
