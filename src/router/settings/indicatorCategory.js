export default [
  {
    path: '/settings/indicator-categories',
    name: 'settings-indicator-categories',
    component: () => import('@/views/settings/indicator-category/IndicatorCategoryPage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.indicatorCategory.breadActive', to: '/settings/indicator-categories' },
      ],
      title: 'settings.indicatorCategory.pageTitle',
    },
  },
];
