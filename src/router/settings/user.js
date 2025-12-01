export default [
  {
    path: "/settings/users",
    name: "settings-users",
    component: () => import("@/views/settings/user/UserPage.vue"),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.user.breadActive', to: '/settings/users' }
      ],
      title: "settings.user.pageTitle",
    },
  },
];
