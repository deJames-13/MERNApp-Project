import * as features from '#features';

const v1 = [
  // NEW ROUTE HERE ->
    ...features.brandRoutes,
    ...features.courierRoutes,
    ...features.supplierRoutes,
    ...features.categoryRoutes,
    ...features.userRoutes,
];

export default v1;
