import UserProfile from '../../server/models/UserProfile.js';

describe('UserProfiles Model', () => {
  beforeAll(async () => {
    await UserProfile.sync({ force: true }); // Ensure the table is created and empty
  });

  test('should create a new profile', async () => {
    const profile = await UserProfile.create({
      userId: 1,
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      skills: ['Cooking', 'Teaching'],
      availability: ['2024-06-15', '2024-06-20'],
    });

    expect(profile.fullName).toBe('John Doe');
  });

  test('should not create a profile without required fields', async () => {
    try {
      await UserProfile.create({
        userId: 1,
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
