import layoutRoutes from './layout';

export default [
  {
    path: '/elementary-levels',
    name: 'elementaryLevel',
    component: () => import('@/views/elementary-level/ListPage.vue'),
    meta: {
      auth: true,
      title: 'elementaryLevel.list.pageTitle',
    },
  },
  {
    path: '/elementary-levels/create/:id?',
    name: 'elementaryLevel-create',
    component: () => import('@/views/elementary-level/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'elementaryLevel.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
