import { UserInfo, UserModel, UserService } from '#features';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { Seeder } from './seeder.js';

export const createAdmin = async () => {
  const admin = await UserModel.findOne({ email: process.env.ADMIN_EMAIL });
  if (!admin) {
    console.log('Creating admin for the first time.');
    const info = await UserInfo.create({
      first_name: 'Admin',
      last_name: 'User',
      contact: '1234567890',
      address: '123 Main St',
      city: 'City',
      region: 'Region',
      zip_code: '12345',
    });
    const user = await UserService.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
      info: info._id,
      emailVerifiedAt: new Date(),
    });
    if (!user) return console.log('Admin user not created');
    console.log('Admin user created: ', user);
  }

}

class UserSeeder extends Seeder {
  constructor(service, count) {
    super(service, count);
  }
  hash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  schema() {
    return {
      username: faker.internet.userName,
      email: faker.internet.email,
      password: () => this.hash(faker.internet.password()),
    };
  }
}

export const userSeeder = async (count = 10) => {
  const seeder = new UserSeeder(UserService, count);
  await seeder.run();
};

