import layoutRoutes from './layout';

export default [
  {
    path: '/capability-domains',
    name: 'capabilityDomain',
    component: () => import('@/views/capability-domain/ListPage.vue'),
    meta: {
      auth: true,
      title: 'capabilityDomain.list.pageTitle',
    },
  },
  {
    path: '/capability-domains/create/:id?',
    name: 'capabilityDomain-create',
    component: () => import('@/views/capability-domain/CreatePage.vue'),
    meta: {
      auth: true,
       title: 'capabilityDomain.create.pageTitle',
    },
  },
  ...layoutRoutes,
];
