import { updateProfile, getProfile } from '../../server/controllers/profileController.js';
import UserProfile from '../../server/models/UserProfile.js';

describe('UserProfile Controller', () => {
  let req, res;

  beforeAll(async () => {
    await UserProfile.sync(); // Ensure the table is created and empty
  });

  beforeEach(() => {
    req = {
      body: {},
      user: { id: 1 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  test('should update a profile', async () => {
    await UserProfile.create({
      userId: 1,
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      skills: ['Cooking', 'Teaching'],
      availability: ['2024-06-15', '2024-06-20'],
    });

    req.body = {
      fullName: 'Jane Doe',
      address1: '456 Elm St',
      city: 'Othertown',
      state: 'TX',
      zipCode: '67890',
      skills: ['Gardening'],
      availability: ['2024-07-01', '2024-07-05'],
    };

    await updateProfile(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test('should get a profile', async () => {
    req.user.id = 1;

    await getProfile(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});
