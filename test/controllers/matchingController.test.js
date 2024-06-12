import { matchVolunteersToEvents } from '../../server/controllers/matchingController.js';
import UserProfile from '../../server/models/UserProfile.js';
import EventDetails from '../../server/models/EventDetails.js';

describe('Matching Controller', () => {
  let req, res;

  beforeAll(async () => {
    await UserProfile.sync({ force: true }); // Ensure the table is created and empty
    await EventDetails.sync({ force: true }); // Ensure the table is created and empty

    // Create sample user profiles
    await UserProfile.bulkCreate([
      {
        id: 1,
        fullName: 'John Doe',
        address1: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        skills: ['Cleaning'],
        availability: ['2024-07-01'],
      },
      {
        id: 2,
        fullName: 'Jane Smith',
        address1: '456 Oak St',
        city: 'Othertown',
        state: 'TX',
        zipCode: '67890',
        skills: ['Organizing'],
        availability: ['2024-07-01', '2024-07-05'],
      },
      {
        id: 3,
        fullName: 'Bob Johnson',
        address1: '789 Pine St',
        city: 'Sometown',
        state: 'FL',
        zipCode: '34567',
        skills: ['Driving'],
        availability: ['2024-07-10'],
      }
    ]);

    // Create sample events
    await EventDetails.bulkCreate([
      {
        id: 1,
        eventName: 'Community Clean Up',
        eventDescription: 'Join us to clean up the park.',
        location: 'Central Park',
        requiredSkills: ['Cleaning'],
        urgency: 'High',
        eventDate: '2024-07-01',
      },
      {
        id: 2,
        eventName: 'Food Drive',
        eventDescription: 'Help us collect and distribute food.',
        location: 'Community Center',
        requiredSkills: ['Organizing'],
        urgency: 'Medium',
        eventDate: '2024-07-01',
      },
      {
        id: 3,
        eventName: 'Tree Planting',
        eventDescription: 'Join us to plant trees in the neighborhood.',
        location: 'Neighborhood Park',
        requiredSkills: ['Planting'],
        urgency: 'Low',
        eventDate: '2024-07-10',
      }
    ]);
  });

  beforeEach(() => {
    req = {
      user: { id: 1 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  test('should match volunteers to events', async () => {
    await matchVolunteersToEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
