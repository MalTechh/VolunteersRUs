import { getVolunteerHistory } from '../../server/controllers/historyController.js';
import VolunteerHistory from '../../server/models/VolunteerHistory.js';
import UserProfile from '../../server/models/UserProfile.js';

jest.mock('../../server/models/VolunteerHistory.js'); // Adjust the path accordingly
jest.mock('../../server/models/UserProfile.js'); // Adjust the path accordingly
jest.mock('../../server/models/EventDetails.js'); // Adjust the path accordingly

describe('VolunteerHistory Controller', () => {
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

  test('should get volunteer history', async () => {
    req.body = {
      UserID: 1,
    };

    // Mock the database calls
    VolunteerHistory.findAll.mockResolvedValue([
      {
        Status: 'Completed',
        UserID: 1,
        'eventDetails.EventName': 'Community Clean Up',
        'eventDetails.Description': 'Join us to clean up the park.',
        'eventDetails.Location': 'Central Park',
        'eventDetails.RequiredSkills': ['Cleaning'],
        'eventDetails.Urgency': 'High',
        'eventDetails.EventDate': '2024-07-01',
      },
    ]);

    UserProfile.findAll.mockResolvedValue([
      {
        UserID: 1,
        FullName: 'John Doe',
      },
    ]);

    await getVolunteerHistory(req, res);

    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      history: expect.arrayContaining([
        expect.objectContaining({
          FullName: 'John Doe',
          EventName: 'Community Clean Up',
          Description: 'Join us to clean up the park.',
          Location: 'Central Park',
          RequiredSkills: ['Cleaning'],
          Urgency: 'High',
          EventDate: '2024-07-01',
          Status: 'Completed',
        }),
      ]),
    }));
  });
});
