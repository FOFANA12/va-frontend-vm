import layoutRoutes from './layout';

export default [
  {
    path: '/action-domains',
    name: 'actionDomain',
    component: () => import('@/views/action-domain/ListPage.vue'),
    meta: {
      auth: true,
      title: 'actionDomain.list.pageTitle',
    },
  },
  {
    path: '/action-domains/create/:id?',
    name: 'actionDomain-create',
    component: () => import('@/views/action-domain/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'actionDomain.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
