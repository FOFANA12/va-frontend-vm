import { contractRoutes } from './contract';
import { supplierEvaluationRoutes } from './supplierEvaluation';
import { attachmentRoutes } from './attachment';

export default [
  {
    path: '/suppliers/edit/:id',
    component: () => import('@/views/supplier/layouts/SupplierLayout.vue'),
    children: [
      {
        path: '',
        name: 'supplier-edit',
        component: () => import('@/views/supplier/EditPage.vue'),
        meta: {
          auth: true,
          title: 'supplier.edit.pageTitle',
        },
      },
      ...contractRoutes('edit'),
      ...supplierEvaluationRoutes('edit'),
      ...attachmentRoutes('edit'),
    ],
  },
  {
    path: '/suppliers/show/:id',
    component: () => import('@/views/supplier/layouts/SupplierLayout.vue'),
    children: [
      {
        path: '',
        name: 'supplier-show',
        component: () => import('@/views/supplier/ViewPage.vue'),
        meta: {
          auth: true,
          title: 'supplier.view.pageTitle',
        },
      },
      ...contractRoutes('show'),
      ...supplierEvaluationRoutes('show'),
      ...attachmentRoutes('show'),
    ],
  },
];
