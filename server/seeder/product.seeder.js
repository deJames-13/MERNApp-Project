import { ProductService } from '#features';
import { faker } from '@faker-js/faker';
import { Seeder } from './seeder';

class ProductSeeder extends Seeder {
  schema() {
    return {
      name: () =>
        faker.commerce.product() +
        ' Product Code: ' +
        faker.string.alpha({ length: 6, casing: 'upper', exclude: ['A'] }),
      description: faker.commerce.productDescription,
      price: () => faker.commerce.price({ min: 1000 }),
      stock: () => faker.number.int({ min: 64, max: 100 }),
    };
  }
}

export const productSeeder = async (count = 10) => {
  const seeder = new ProductSeeder(ProductService, count);
  await seeder.run();
};

