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
      // ...features._exampleRoutes,
      ...features.brandRoutes,
      ...features.categoryRoutes,
      ...features.productRoutes,
      ...features.courierRoutes,
      ...features.supplierRoutes,
      ...features.userRoutes,
      ...features.reviewRoutes,
    ],
  },
];

export default privateRoutes;
