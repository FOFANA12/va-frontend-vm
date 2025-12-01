export default [
  {
    path: '/strategic-axes',
    name: 'strategic-axes',
    component: () => import('@/views/strategic-axis/ListPage.vue'),
    meta: {
      auth: true,
      title: 'strategicAxis.list.pageTitle',
    },
  },
  {
    path: '/strategic-axes/create',
    name: 'strategic-axes-create',
    component: () => import('@/views/strategic-axis/CreatePage.vue'),
    meta: {
      auth: true,
      title: 'strategicAxis.create.pageTitle',
    },
  },
  {
    path: '/strategic-axes/edit/:id',
    name: 'strategic-axes-edit',
    component: () => import('@/views/strategic-axis/EditPage.vue'),
    meta: {
      auth: true,
      title: 'strategicAxis.edit.pageTitle',
    },
  },
  {
    path: '/strategic-axes/show/:id',
    name: 'strategic-axes-show',
    component: () => import('@/views/strategic-axis/ViewPage.vue'),
    meta: {
      auth: true,
      title: 'strategicAxis.view.pageTitle',
    },
  },
];
