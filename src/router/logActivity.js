export default [
  {
    path: '/log-activities',
    name: 'log-activity',
    component: () => import('@/views/log-activity/ListPage.vue'),
    meta: {
      auth: true,
      title: 'logActivity.list.pageTitle',
    },
  },
  {
    path: '/log-activities/:id',
    name: 'log-activity-show',
    component: () => import('@/views/log-activity/ViewPage.vue'),
    props: true,
    meta: {
      auth: true,
      title: 'logActivity.view.pageTitle',
    },
  },
];
