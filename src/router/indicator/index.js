import layoutRoutes from './layout';

export default [
  {
    path: '/indicators',
    name: 'indicator',
    component: () => import('@/views/indicator/ListPage.vue'),
    meta: {
      auth: true,
      title: 'indicator.list.pageTitle',
    },
  },
  {
    path: '/indicators/create/:id?',
    name: 'indicator-create',
    component: () => import('@/views/indicator/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'indicator.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
