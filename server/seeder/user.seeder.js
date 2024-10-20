import { UserService } from '#features';
import { faker } from '@faker-js/faker';
import { Seeder } from './seeder';

class UserSeeder extends Seeder {
  constructor(service, count) {
    super(service, count);
  }
  custom() {
    return [
      {
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
    ];
  }
  schema() {
    return {
      username: faker.internet.userName,
      email: faker.internet.email,
      password: faker.internet.password,
    };
  }
}

export const userSeeder = async (count = 10) => {
  const seeder = new UserSeeder(UserService, count);
  await seeder.run();
};

