export default [
  {
    path: '/settings/payment-modes',
    name: 'settings-payment-modes',
    component: () => import('@/views/settings/payment-mode/PaymentModePage.vue'),
    meta: {
      auth: true,
      breadcrumbs: [
        { title: 'sidebar.dashboard', to: '/' },
        { title: 'sidebar.settings.title', disabled: true },
        { title: 'settings.paymentMode.breadActive', to: '/settings/payment-modes' },
      ],
      title: 'settings.paymentMode.pageTitle',
    },
  },
];
