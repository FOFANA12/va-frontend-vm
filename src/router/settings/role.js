// import PERMISSIONS from '@/constants/permissions';
export default [
  {
    path: '/settings/roles',
    name: 'settings-role',
    component: () => import('@/views/settings/role/ListPage.vue'),
    meta: {
      auth: true,
      title: 'settings.role.list.pageTitle',
      // requiredPermissions: [PERMISSIONS.MANAGE_ROLES],
    },
  },
  {
    path: '/settings/roles/create',
    name: 'settings-role-create',
    component: () => import('@/views/settings/role/CreatePage.vue'),
    meta: {
      auth: true,
      title: 'settings.role.create.pageTitle',
      // requiredPermissions: [PERMISSIONS.MANAGE_ROLES],
    },
  },
  {
    path: '/settings/roles/edit/:id',
    name: 'settings-role-edit',
    component: () => import('@/views/settings/role/EditPage.vue'),
    meta: {
      auth: true,
      title: 'settings.role.edit.pageTitle',
      // requiredPermissions: [PERMISSIONS.MANAGE_ROLES],
    },
  },
  {
    path: '/settings/roles/show/:id',
    name: 'settings-role-show',
    component: () => import('@/views/settings/role/ViewPage.vue'),
    meta: {
      auth: true,
      title: 'settings.role.view.pageTitle',
      // requiredPermissions: [PERMISSIONS.MANAGE_ROLES],
    },
  },
];
