import { programAttachmentRoutes } from './attachment';
import { programStatusRoutes } from './status';
import { programStateRoutes } from './state';

export default [
  {
    path: '/programs/edit/:id',
    component: () => import('@/views/program/layouts/ProgramLayout.vue'),
    children: [
      {
        path: '',
        name: 'program-edit',
        component: () => import('@/views/program/EditPage.vue'),
        meta: {
          auth: true,
          title: 'program.edit.pageTitle',
        },
      },
      ...programAttachmentRoutes('edit'),
      ...programStatusRoutes('edit'),
      ...programStateRoutes('edit'),
    ],
  },
  {
    path: '/programs/show/:id',
    component: () => import('@/views/program/layouts/ProgramLayout.vue'),
    children: [
      {
        path: '',
        name: 'program-show',
        component: () => import('@/views/program/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'program.view.pageTitle',
        },
      },
      ...programAttachmentRoutes('show'),
      ...programStatusRoutes('show'),
      ...programStateRoutes('show'),
    ],
  },
];
