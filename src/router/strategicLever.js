export default [
  {
    path: '/strategic-levers',
    name: 'strategic-levers',
    component: () => import('@/views/strategic-lever/ListPage.vue'),
    meta: {
      auth: true,
      title: 'strategicLever.list.pageTitle',
    },
  },
  {
    path: '/strategic-levers/create',
    name: 'strategic-levers-create',
    component: () => import('@/views/strategic-lever/CreatePage.vue'),
    meta: {
      auth: true,
      title: 'strategicLever.create.pageTitle',
    },
  },
  {
    path: '/strategic-levers/edit/:id',
    name: 'strategic-levers-edit',
    component: () => import('@/views/strategic-lever/EditPage.vue'),
    meta: {
      auth: true,
      title: 'strategicLever.edit.pageTitle',
    },
  },
  {
    path: '/strategic-levers/show/:id',
    name: 'strategic-levers-show',
    component: () => import('@/views/strategic-lever/ViewPage.vue'),
    meta: {
      auth: true,
      title: 'strategicLever.view.pageTitle',
    },
  },
];
