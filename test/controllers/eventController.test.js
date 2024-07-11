import { createEvent, getEvents, registerForEvent } from '../../server/controllers/eventController.js';
import EventDetails from '../../server/models/EventDetails.js';
import VolunteerHistory from '../../server/models/VolunteerHistory.js';

jest.mock('../../server/models/EventDetails.js'); 
jest.mock('../../server/models/VolunteerHistory.js');

describe('Event Controller', () => {
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

  test('should create an event', async () => {
    req.body = {
      eventName: 'Community Clean Up',
      eventDescription: 'Join us to clean up the park.',
      location: 'Central Park',
      requiredSkills: ['Cleaning'],
      urgency: 'High',
      eventDate: '2024-07-01',
    };

    const saveMock = jest.fn().mockResolvedValue(req.body);
    EventDetails.mockImplementation(() => {
      return {
        save: saveMock,
        ...req.body
      };
    });

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      eventName: 'Community Clean Up',
    }));
  });

  test('should get all events', async () => {
    await getEvents(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test('should register for an event', async () => {
    req.body = {
      eventId: 1,
    };

    EventDetails.findByPk.mockResolvedValue({ id: 1 });
    VolunteerHistory.create.mockResolvedValue({
      userId: req.user.id,
      eventId: req.body.eventId,
      participationStatus: 'Registered'
    });

    await registerForEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Registered for event successfully',
      registration: expect.objectContaining({
        userId: req.user.id,
        eventId: req.body.eventId,
        participationStatus: 'Registered'
      })
    }));
  });
});
