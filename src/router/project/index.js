import layoutRoutes from './layout';

export default [
  {
    path: '/projects',
    name: 'project',
    component: () => import('@/views/project/ListPage.vue'),
    meta: {
      auth: true,
      title: 'project.list.pageTitle',
    },
  },
  {
    path: '/projects/create/:id?',
    name: 'project-create',
    component: () => import('@/views/project/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'project.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
