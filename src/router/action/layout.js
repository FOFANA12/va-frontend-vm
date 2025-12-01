import { actionPlanningRoutes } from './planning';
import { actionPhaseRoutes } from './phase';
import { actionControlRoutes } from './control';
import { actionDecisionRoutes } from './decision';
import { actionAlignmentRoutes } from './alignment';
import { actionAttachmentRoutes } from './attachment';
import { actionReportRoutes } from './report';
import { actionStatusRoutes } from './status';

export default [
  {
    path: '/actions/edit/:id',
    component: () => import('@/views/action/layouts/ActionLayout.vue'),
    children: [
      {
        path: '',
        name: 'action-edit',
        component: () => import('@/views/action/EditPage.vue'),
        meta: {
          auth: true,
          title: 'action.edit.pageTitle',
        },
      },
      ...actionPlanningRoutes('edit'),
      ...actionPhaseRoutes('edit'),
      ...actionControlRoutes('edit'),
      ...actionDecisionRoutes('edit'),
      ...actionAlignmentRoutes('edit'),
      ...actionAttachmentRoutes('edit'),
      ...actionReportRoutes('edit'),
      ...actionStatusRoutes('edit'),
    ],
  },
  {
    path: '/actions/show/:id',
    component: () => import('@/views/action/layouts/ActionLayout.vue'),
    children: [
      {
        path: '',
        name: 'action-show',
        component: () => import('@/views/action/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'action.view.pageTitle',
        },
      },
      ...actionPlanningRoutes('show'),
      ...actionPhaseRoutes('show'),
      ...actionControlRoutes('show'),
      ...actionDecisionRoutes('show'),
      ...actionAlignmentRoutes('show'),
      ...actionAttachmentRoutes('show'),
      ...actionReportRoutes('show'),
      ...actionStatusRoutes('show'),
    ],
  },
];
