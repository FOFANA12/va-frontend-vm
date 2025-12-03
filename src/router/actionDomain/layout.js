// import { programAttachmentRoutes } from './attachment';
import { actionDomainAttachmentRoutes } from './attachment';
import { programStatusRoutes } from './status';
import { programStateRoutes } from './state';

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
          title: 'program.edit.pageTitle',
        },
      },
      // ...programAttachmentRoutes('edit'),
      ...actionDomainAttachmentRoutes('edit'),
      ...programStatusRoutes('edit'),
      ...programStateRoutes('edit'),
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
      // ...programAttachmentRoutes('show'),
      ...actionDomainAttachmentRoutes('show'),
      ...programStatusRoutes('show'),
      ...programStateRoutes('show'),
    ],
  },
];
