import bcrypt from 'bcrypt';
import { ADMIN, REGISTERED } from '../utils/consts';

const hashPassword = async () => {
  const returned = await bcrypt.hash(process.env.ADMIN_PASSWORD, 5);
  return returned;
};

export const user = 'da1cefe8-5d73-4174-9543-3e6d8b47218a';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('User', [
    {
      email: 'admin@genericapp.com',
      password: await hashPassword(),
      id: user,
      roles: [REGISTERED, ADMIN],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};
