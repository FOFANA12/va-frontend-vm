import { indicatorPlanningRoutes } from './planning';
import { indicatorControlRoutes } from './control';
import { indicatorAttachmentRoutes } from './attachment';
import { indicatorReportRoutes } from './report';
import { indicatorDecisionRoutes } from './decision';
import { indicatorStatusRoutes } from './status';

export default [
  {
    path: '/indicators/edit/:id',
    component: () => import('@/views/indicator/layouts/IndicatorLayout.vue'),
    children: [
      {
        path: '',
        name: 'indicator-edit',
        component: () => import('@/views/indicator/EditPage.vue'),
        meta: {
          auth: true,
          title: 'indicator.edit.pageTitle',
        },
      },
      ...indicatorPlanningRoutes('edit'),
      ...indicatorControlRoutes('edit'),
      ...indicatorAttachmentRoutes('edit'),
      ...indicatorReportRoutes('edit'),
      ...indicatorDecisionRoutes('edit'),
      ...indicatorStatusRoutes('edit'),
    ],
  },
  {
    path: '/indicators/show/:id',
    component: () => import('@/views/indicator/layouts/IndicatorLayout.vue'),
    children: [
      {
        path: '',
        name: 'indicator-show',
        component: () => import('@/views/indicator/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'indicator.view.pageTitle',
        },
      },
      ...indicatorPlanningRoutes('show'),
      ...indicatorControlRoutes('show'),
      ...indicatorAttachmentRoutes('show'),
      ...indicatorReportRoutes('show'),
      ...indicatorDecisionRoutes('show'),
      ...indicatorStatusRoutes('show'),
    ],
  },
];
