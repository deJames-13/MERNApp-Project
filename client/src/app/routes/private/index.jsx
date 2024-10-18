import * as features from '@features';
import { PrivateLayout } from '@layouts';
import { Dashboard } from '@screens';
console.log(features);
const privateRoutes = [
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      // NEW ROUTE HERE ->
      ...features._exampleRoutes,
      ...features.productRoutes,
      ...features.brandRoutes,
      ...features.courierRoutes,
      ...features.supplierRoutes,
      ...features.categoryRoutes,
      ...features.userRoutes,
    ],
  },
];

export default privateRoutes;
