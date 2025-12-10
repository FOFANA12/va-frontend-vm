import { strategicDomainAttachmentRoutes } from './attachment';
import { strategicDomainStatusRoutes } from './status';
import { strategicDomainStateRoutes } from './state';
import { strategicDomainReportRoutes } from './report';

export default [
  {
    path: '/strategic-domains/edit/:id',
    component: () => import('@/views/strategic-domain/layouts/StrategicDomainLayout.vue'),
    children: [
      {
        path: '',
        name: 'strategicDomain-edit',
        component: () => import('@/views/strategic-domain/EditPage.vue'),
        meta: {
          auth: true,
          title: 'strategicDomain.edit.pageTitle',
        },
      },
      ...strategicDomainAttachmentRoutes('edit'),
      ...strategicDomainStatusRoutes('edit'),
      ...strategicDomainStateRoutes('edit'),
      ...strategicDomainReportRoutes('edit'),
    ],
  },
  {
    path: '/strategic-domains/show/:id',
    component: () => import('@/views/strategic-domain/layouts/StrategicDomainLayout.vue'),
    children: [
      {
        path: '',
        name: 'strategicDomain-show',
        component: () => import('@/views/strategic-domain/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'strategicDomain.view.pageTitle',
        },
      },
      ...strategicDomainAttachmentRoutes('show'),
      ...strategicDomainStatusRoutes('show'),
      ...strategicDomainStateRoutes('show'),
      ...strategicDomainReportRoutes('show'),
    ],
  },
];
