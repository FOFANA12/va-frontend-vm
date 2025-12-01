import layoutRoutes from './layout';

export default [
  {
    path: '/programs',
    name: 'program',
    component: () => import('@/views/program/ListPage.vue'),
    meta: {
      auth: true,
      title: 'program.list.pageTitle',
    },
  },
  {
    path: '/programs/create/:id?',
    name: 'program-create',
    component: () => import('@/views/program/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'program.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
