import { stakeholderRoutes } from './stakeholder';
import { matrixRoutes } from './matrix';

export default [
  {
    path: '/strategic-maps/details/:id',
    component: () => import('@/views/strategic-map/layouts/StrategicMapLayout.vue'),
    children: [
      {
        path: '',
        name: 'strategicMap-details',
        component: () => import('@/views/strategic-map/DetailsPage.vue'),
        meta: {
          auth: true,
          title: 'strategicMap.details.pageTitle',
        },
      },
      ...stakeholderRoutes('show'),
      ...matrixRoutes('show'),
    ],
  },
];
