import { capabilityDomainAttachmentRoutes } from './attachment';
import { capabilityDomainStatusRoutes } from './status';
import { capabilityDomainStateRoutes } from './state';

export default [
  {
    path: '/capability-domains/edit/:id',
    component: () => import('@/views/capability-domain/layouts/CapabilityDomainLayout.vue'),
    children: [
      {
        path: '',
        name: 'capabilityDomain-edit',
        component: () => import('@/views/capability-domain/EditPage.vue'),
        meta: {
          auth: true,
          title: 'capabilityDomain.edit.pageTitle',
        },
      },
      ...capabilityDomainAttachmentRoutes('edit'),
      ...capabilityDomainStatusRoutes('edit'),
      ...capabilityDomainStateRoutes('edit'),
    ],
  },
  {
    path: '/capability-domains/show/:id',
    component: () => import('@/views/capability-domain/layouts/CapabilityDomainLayout.vue'),
    children: [
      {
        path: '',
        name: 'capabilityDomain-show',
        component: () => import('@/views/capability-domain/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'capabilityDomain.view.pageTitle',
        },
      },
      ...capabilityDomainAttachmentRoutes('show'),
      ...capabilityDomainStatusRoutes('show'),
      ...capabilityDomainStateRoutes('show'),
    ],
  },
];
