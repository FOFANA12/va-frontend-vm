import layoutRoutes from './layout';

export default [
  {
    path: '/suppliers',
    name: 'supplier',
    component: () => import('@/views/supplier/ListPage.vue'),
    meta: {
      auth: true,
      title: 'supplier.list.pageTitle',
    },
  },
  {
    path: '/suppliers/create',
    name: 'supplier-create',
    component: () => import('@/views/supplier/CreatePage.vue'),
    meta: {
      auth: true,
      title: 'supplier.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
