import bcrypt from 'bcrypt';
import {
  ADMIN,
  REGISTERED,
  userWithAdmin,
} from '../utils/consts';

const hashPassword = async () => {
  const returned = await bcrypt.hash('userpassword', 5);
  return returned;
};

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('User', [
    {
      email: 'userwithadmin@genericapp.com',
      password: await hashPassword(),
      id: userWithAdmin,
      roles: [REGISTERED, ADMIN],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};
