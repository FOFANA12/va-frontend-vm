export default [
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: {
      title: 'login.pageTitle',
    },
  },
  {
    path: '/auth/password/forgot',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordPage.vue'),
    meta: {
      title: 'forgotPassword.pageTitle',
    },
  },
  {
    path: '/auth/password/reset/:token/:email',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPasswordPage.vue'),
    meta: {
      title: 'resetPassword.pageTitle',
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import('@/views/auth/ProfilePage.vue'),
    meta: {
      auth: true,
      title: "profile.pageTitle",
    },
  },
];
