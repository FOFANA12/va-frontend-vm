import layoutRoutes from './layout';

export default [
  {
    path: '/strategic-domains',
    name: 'strategicDomain',
    component: () => import('@/views/strategic-domain/ListPage.vue'),
    meta: {
      auth: true,
      title: 'strategicDomain.list.pageTitle',
    },
  },
  {
    path: '/strategic-domains/create/:id?',
    name: 'strategicDomain-create',
    component: () => import('@/views/strategic-domain/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'strategicDomain.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
