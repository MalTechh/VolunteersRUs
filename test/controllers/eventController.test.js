import { createEvent, getEvents, registerForEvent } from '../../server/controllers/eventController.js';
import EventDetails from '../../server/models/EventDetails.js';

describe('Event Controller', () => {
  let req, res;

  beforeAll(async () => {
    try {
      await EventDetails.sync({ force: true }); // Ensure the table is created and empty
    } catch (error) {
      console.error('Error syncing EventDetails model:', error);
    }
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

  test('should create an event', async () => {
    req.body = {
      eventName: 'Community Clean Up',
      eventDescription: 'Join us to clean up the park.',
      location: 'Central Park',
      requiredSkills: ['Cleaning'],
      urgency: 'High',
      eventDate: '2024-07-01',
    };

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      eventName: 'Community Clean Up',
    }));
  });

  test('should get all events', async () => {
    await getEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test('should register for an event', async () => {
    req.body = {
      eventId: 1,
    };

    await registerForEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Registered for event successfully',
    }));
  });
});
