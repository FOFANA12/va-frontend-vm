import { elementaryLevelAttachmentRoutes } from './attachment';
import { elementaryLevelStatusRoutes } from './status';
import { elementaryLevelStateRoutes } from './state';
import { elementaryLevelReportRoutes } from './report';
export default [
  {
    path: '/elementary-levels/edit/:id',
    component: () => import('@/views/elementary-level/layouts/ElementaryLevelLayout.vue'),
    children: [
      {
        path: '',
        name: 'elementaryLevel-edit',
        component: () => import('@/views/elementary-level/EditPage.vue'),
        meta: {
          auth: true,
          title: 'elementaryLevel.edit.pageTitle',
        },
      },
      ...elementaryLevelAttachmentRoutes('edit'),
      ...elementaryLevelStatusRoutes('edit'),
      ...elementaryLevelStateRoutes('edit'),
      ...elementaryLevelReportRoutes('edit'),
    ],
  },
  {
    path: '/elementary-levels/show/:id',
    component: () => import('@/views/elementary-level/layouts/ElementaryLevelLayout.vue'),
    children: [
      {
        path: '',
        name: 'elementaryLevel-show',
        component: () => import('@/views/elementary-level/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'elementaryLevel.view.pageTitle',
        },
      },
      ...elementaryLevelAttachmentRoutes('show'),
      ...elementaryLevelStatusRoutes('show'),
      ...elementaryLevelStateRoutes('show'),
      ...elementaryLevelReportRoutes('show'),
    ],
  },
];
