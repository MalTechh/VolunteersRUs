import request from 'supertest';
import app from '../../server/app.js';

describe('Event Routes', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'newuser@example.com', password: 'password123' });
    token = response.body.token;
  });

  test('should create a new event', async () => {
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
    const response = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('should register for an event', async () => {
    const response = await request(app)
      .post('/api/events/register')
      .set('Authorization', `Bearer ${token}`)
      .send({ eventId: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Registered for event successfully');
  });
});
