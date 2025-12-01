import layoutRoutes from './layout';

export default [
  {
    path: '/activities',
    name: 'activity',
    component: () => import('@/views/activity/ListPage.vue'),
    meta: {
      auth: true,
      title: 'activity.list.pageTitle',
    },
  },
  {
    path: '/activities/create/:id?',
    name: 'activity-create',
    component: () => import('@/views/activity/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'activity.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
