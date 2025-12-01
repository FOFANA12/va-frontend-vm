import layoutRoutes from './layout';

export default [
  {
    path: '/actions',
    name: 'action',
    component: () => import('@/views/action/ListPage.vue'),
    meta: {
      auth: true,
      title: 'action.list.pageTitle',
    },
  },
  {
    path: '/actions/create/:id?',
    name: 'action-create',
    component: () => import('@/views/action/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'action.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
