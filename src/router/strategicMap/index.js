import layoutRoutes from './layout';

export default [
  {
    path: '/strategic-maps',
    name: 'strategicMap',
    component: () => import('@/views/strategic-map/ListPage.vue'),
    meta: {
      auth: true,
      title: 'strategicMap.list.pageTitle',
    },
  },
  ...layoutRoutes,
];
