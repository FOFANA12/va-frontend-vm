import layoutRoutes from './layout';

export default [
  {
    path: '/strategic-objectives',
    name: 'strategicObjective',
    component: () => import('@/views/strategic-objective/ListPage.vue'),
    meta: {
      auth: true,
      title: 'strategicObjective.list.pageTitle',
    },
  },
  {
    path: '/strategic-objectives/create',
    name: 'strategicObjective-create',
    component: () => import('@/views/strategic-objective/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'strategicObjective.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
