import * as features from '#features';

const v1 = [
  // NEW ROUTE HERE ->
    ...features.orderRoutes,
    ...features.cartRoutes,
  ...features._exampleRoutes,
  ...features.brandRoutes,
  ...features.productRoutes,
  ...features.courierRoutes,
  ...features.supplierRoutes,
  ...features.categoryRoutes,
  ...features.userRoutes,
];

export default v1;
