export default [
  {
    path: '/employees',
    name: 'employee',
    component: () => import('@/views/employee/ListPage.vue'),
    meta: {
      auth: true,
      title: 'employee.list.pageTitle',
    },
  },
  {
    path: '/employees/create',
    name: 'employee-create',
    component: () => import('@/views/employee/CreatePage.vue'),
    meta: {
      auth: true,
      title: 'employee.create.pageTitle',
    },
  },
  {
    path: '/employees/edit/:id',
    name: 'employee-edit',
    component: () => import('@/views/employee/EditPage.vue'),
    meta: {
      auth: true,
      title: 'employee.edit.pageTitle',
    },
  },
  {
    path: '/employees/show/:id',
    name: 'employee-show',
    component: () => import('@/views/employee/ViewPage.vue'),
    meta: {
      auth: true,
      title: 'employee.view.pageTitle',
    },
  },
];
