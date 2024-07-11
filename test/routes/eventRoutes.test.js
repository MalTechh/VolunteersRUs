import request from 'supertest';
import app from '../../server/app.js';
import * as eventController from '../../server/controllers/eventController.js';
import jwt from 'jsonwebtoken';

jest.mock('../../server/controllers/eventController.js'); // Mock the eventController module

describe('Event Routes', () => {
  let token;

  beforeAll(() => {
    // Mock token generation
    token = jwt.sign({ UserID: 1, UserType: 'admin' }, 'your_jwt_secret');
  });

  test('should create a new event', async () => {
    // Mock the createEvent function
    eventController.createEvent.mockImplementation((req, res) => {
      res.status(201).json({
        eventName: 'Community Clean Up',
        eventDescription: 'Join us to clean up the park.',
        location: 'Central Park',
        requiredSkills: ['Cleaning'],
        urgency: 'High',
        eventDate: '2024-07-01',
      });
    });

    const response = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        eventName: 'Community Clean Up',
        eventDescription: 'Join us to clean up the park.',
        location: 'Central Park',
        requiredSkills: ['Cleaning'],
        urgency: 'High',
        eventDate: '2024-07-01',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('eventName', 'Community Clean Up');
  });

  test('should get all events', async () => {
    // Mock the getEvents function
    eventController.getEvents.mockImplementation((req, res) => {
      res.status(200).json([
        {
          eventName: 'Community Clean Up',
          eventDescription: 'Join us to clean up the park.',
          location: 'Central Park',
          requiredSkills: ['Cleaning'],
          urgency: 'High',
          eventDate: '2024-07-01',
        },
      ]);
    });

    const response = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('eventName', 'Community Clean Up');
  });

  test('should register for an event', async () => {
    // Mock the registerForEvent function
    eventController.registerForEvent.mockImplementation((req, res) => {
      res.status(201).json({ message: 'Registered for event successfully' });
    });

    const response = await request(app)
      .post('/api/events/register')
      .set('Authorization', `Bearer ${token}`)
      .send({ eventId: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Registered for event successfully');
  });
});
