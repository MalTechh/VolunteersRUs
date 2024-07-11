import { updateProfile, getProfile } from '../../server/controllers/profileController.js';
import UserProfile from '../../server/models/UserProfile.js';

jest.mock('../../server/models/UserProfile.js');

describe('UserProfile Controller', () => {
  let req, res;

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
    const profileMock = {
      update: jest.fn().mockResolvedValue(null),
      toJSON: jest.fn().mockReturnValue({
        UserID: 1,
        FullName: 'Jane Doe',
        Address1: '456 Elm St',
        City: 'Othertown',
        State: 'TX',
        ZipCode: '67890',
        Skills: JSON.stringify(['Gardening']),
        Availability: JSON.stringify(['2024-07-01', '2024-07-05']),
      }),
    };

    UserProfile.findOne.mockResolvedValue(profileMock);

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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      UserID: 1,
      FullName: 'Jane Doe',
      Address1: '456 Elm St',
      City: 'Othertown',
      State: 'TX',
      ZipCode: '67890',
    }));
  });

  test('should get a profile', async () => {
    const profileMock = {
      toJSON: jest.fn().mockReturnValue({
        UserID: 1,
        FullName: 'John Doe',
        Address1: '123 Main St',
        City: 'Anytown',
        State: 'CA',
        ZipCode: '12345',
        Skills: JSON.stringify(['Cooking', 'Teaching']),
        Availability: JSON.stringify(['2024-06-15', '2024-06-20']),
      }),
    };

    UserProfile.findOne.mockResolvedValue(profileMock);

    req.user.id = 1;

    await getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      UserID: 1,
      FullName: 'John Doe',
      Address1: '123 Main St',
      City: 'Anytown',
      State: 'CA',
      ZipCode: '12345',
    }));
  });
});
