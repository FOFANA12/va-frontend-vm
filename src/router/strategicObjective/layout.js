import { objectiveDecisionRoutes } from './decision';
import { objectiveAlignmentRoutes } from './alignment';
import { ObjectiveAttachmentRoutes } from './attachment';

export default [
  {
    path: '/strategic-objectives/edit/:id',
    component: () => import('@/views/strategic-objective/layouts/ObjectiveLayout.vue'),
    children: [
      {
        path: '',
        name: 'strategicObjective-edit',
        component: () => import('@/views/strategic-objective/EditPage.vue'),
        meta: {
          auth: true,
          title: 'strategicObjective.edit.pageTitle',
        },
      },
      ...objectiveAlignmentRoutes('edit'),
      ...objectiveDecisionRoutes('edit'),
      ...ObjectiveAttachmentRoutes('edit'),
    ],
  },
  {
    path: '/strategic-objectives/show/:id',
    component: () => import('@/views/strategic-objective/layouts/ObjectiveLayout.vue'),
    children: [
      {
        path: '',
        name: 'strategicObjective-show',
        component: () => import('@/views/strategic-objective/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'strategicObjective.view.pageTitle',
        },
      },
      ...objectiveAlignmentRoutes('show'),
      ...objectiveDecisionRoutes('show'),
      ...ObjectiveAttachmentRoutes('show'),
    ],
  },
];
