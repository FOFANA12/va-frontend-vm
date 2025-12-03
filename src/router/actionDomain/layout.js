import { actionDomainAttachmentRoutes } from './attachment';
import { actionDomainStatusRoutes } from './status';
import { actionDomainStateRoutes } from './state';

export default [
  {
    path: '/action-domains/edit/:id',
    component: () => import('@/views/action-domain/layouts/ProgramLayout.vue'),
    children: [
      {
        path: '',
        name: 'actionDomain-edit',
        component: () => import('@/views/action-domain/EditPage.vue'),
        meta: {
          auth: true,
          title: 'actionDomain.edit.pageTitle',
        },
      },
      ...actionDomainAttachmentRoutes('edit'),
      ...actionDomainStatusRoutes('edit'),
      ...actionDomainStateRoutes('edit'),
    ],
  },
  {
    path: '/action-domains/show/:id',
    component: () => import('@/views/action-domain/layouts/ProgramLayout.vue'),
    children: [
      {
        path: '',
        name: 'actionDomain-show',
        component: () => import('@/views/action-domain/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'actionDomain.view.pageTitle',
        },
      },
      ...actionDomainAttachmentRoutes('show'),
      ...actionDomainStatusRoutes('show'),
      ...actionDomainStateRoutes('show'),
    ],
  },
];
