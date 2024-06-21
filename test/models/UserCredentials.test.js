import UserCredentials from '../../server/models/UserCredentials.js';

let transaction;

describe('UserCredentials Model', () => {
  beforeAll(async () => {
    await UserCredentials.sync();
  });

  beforeEach(async () => {
    transaction = await UserCredentials.sequelize.transaction();
  });

  afterEach(async () => {
    await transaction.rollback();
  });

  test('should create a new user', async () => {
    try {
      const user = await UserCredentials.create({
        email: 'uniqueuser@example.com',
        password: 'password123',
      }, { transaction });

      expect(user.email).toBe('uniqueuser@example.com');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  });

  test('should not create a user with the same email', async () => {
    try {
      await UserCredentials.create({
        email: 'uniqueuser@example.com',
        password: 'password123',
      }, { transaction });

      await UserCredentials.create({
        email: 'uniqueuser@example.com',
        password: 'password123',
      }, { transaction });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
