import { activityAttachmentRoutes } from './attachment';
import { activityStatusRoutes } from './status';
import { activityStateRoutes } from './state';

export default [
  {
    path: '/activities/edit/:id',
    component: () => import('@/views/activity/layouts/ActivityLayout.vue'),
    children: [
      {
        path: '',
        name: 'activity-edit',
        component: () => import('@/views/activity/EditPage.vue'),
        meta: {
          auth: true,
          title: 'activity.edit.pageTitle',
        },
      },
      ...activityAttachmentRoutes('edit'),
      ...activityStatusRoutes('edit'),
      ...activityStateRoutes('edit'),
    ],
  },
  {
    path: '/activities/show/:id',
    component: () => import('@/views/activity/layouts/ActivityLayout.vue'),
    children: [
      {
        path: '',
        name: 'activity-show',
        component: () => import('@/views/activity/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'activity.view.pageTitle',
        },
      },
      ...activityAttachmentRoutes('show'),
      ...activityStatusRoutes('show'),
      ...activityStateRoutes('show'),
    ],
  },
];
