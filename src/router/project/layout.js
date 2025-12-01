import { projectAttachmentRoutes } from './attachment';
import { projectStatusRoutes } from './status';
import { projectStateRoutes } from './state';

export default [
  {
    path: '/projects/edit/:id',
    component: () => import('@/views/project/layouts/ProjectLayout.vue'),
    children: [
      {
        path: '',
        name: 'project-edit',
        component: () => import('@/views/project/EditPage.vue'),
        meta: {
          auth: true,
          title: 'project.edit.pageTitle',
        },
      },
      ...projectAttachmentRoutes('edit'),
      ...projectStatusRoutes('edit'),
      ...projectStateRoutes('edit'),
    ],
  },
  {
    path: '/projects/show/:id',
    component: () => import('@/views/project/layouts/ProjectLayout.vue'),
    children: [
      {
        path: '',
        name: 'project-show',
        component: () => import('@/views/project/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'project.view.pageTitle',
        },
      },
      ...projectAttachmentRoutes('show'),
      ...projectStatusRoutes('show'),
      ...projectStateRoutes('show'),
    ],
  },
];
