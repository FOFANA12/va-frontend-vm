export default [
  {
    path: '/structures',
    name: 'structures',
    component: () => import('@/views/structure/StructurePage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.organizationalManagement', disabled: true },
        { title: 'sidebar.structures', disabled: true },
        { title: 'structure.breadActive', to: '/structures' },
      ],
      title: 'structure.pageTitle',
    },
  },
];
