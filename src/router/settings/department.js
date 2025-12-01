export default [
  {
    path: '/settings/departments',
    name: 'settings-departments',
    component: () => import('@/views/settings/department/DepartmentPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.department.breadActive', to: '/settings/departments' },
      ],
      title: 'settings.department.pageTitle',
    },
  },
];
