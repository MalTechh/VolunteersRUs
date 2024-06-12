import request from 'supertest';
import app from '../../server/app.js';

describe('Notification Routes', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'newuser@example.com', password: 'password123' });
    token = response.body.token;
  });

  test('should send a notification', async () => {
    const response = await request(app)
      .post('/api/notifications')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'user@example.com', message: 'This is a test notification.' });

    expect(response.status).toBe(200);  // Adjusted status check
    expect(response.body).toHaveProperty('message', 'Notification sent successfully');
  });
});
