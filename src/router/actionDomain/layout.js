import { actionDomainAttachmentRoutes } from './attachment';
import { actionDomainStatusRoutes } from './status';
import { actionDomainStateRoutes } from './state';
import { actionDomainReportRoutes } from './report';

export default [
  {
    path: '/action-domains/edit/:id',
    component: () => import('@/views/action-domain/layouts/ActionDomainLayout.vue'),
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
      ...actionDomainReportRoutes('edit'),
    ],
  },
  {
    path: '/action-domains/show/:id',
    component: () => import('@/views/action-domain/layouts/ActionDomainLayout.vue'),
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
      ...actionDomainReportRoutes('show'),
    ],
  },
];
