import UserCredentials from '../../server/models/UserCredentials.js';

describe('UserCredentials Model', () => {
  beforeAll(async () => {
    await UserCredentials.sync({ force: true }); // Ensure the table is created and empty
  });

  test('should create a new user', async () => {
    const user = await UserCredentials.create({
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(user.email).toBe('testuser@example.com');
  });

  test('should not create a user with the same email', async () => {
    try {
      await UserCredentials.create({
        email: 'testuser@example.com',
        password: 'password123',
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
