import * as features from '@features';
import { PrivateLayout } from '@layouts';
import { Dashboard } from '@screens';
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
    ...features.orderRoutes,
      ...features._exampleRoutes,
      ...features.brandRoutes,
      ...features.productRoutes,
      ...features.courierRoutes,
      ...features.supplierRoutes,
      ...features.categoryRoutes,
      ...features.userRoutes,
    ],
  },
];

export default privateRoutes;
