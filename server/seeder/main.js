import { cartSeeder } from './cart.seeder';
import { productSeeder } from './product.seeder';
import { userSeeder } from './user.seeder';

export const RunSeeders = async () => {
  await userSeeder(3);
  await cartSeeder(6);
  // await productSeeder(20);
};

