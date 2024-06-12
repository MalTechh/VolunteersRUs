import request from 'supertest';
import app from '../../server/app.js';

describe('History Routes', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'newuser@example.com', password: 'password123' });
    token = response.body.token;
  });

  test('should get volunteer history', async () => {
    const response = await request(app)
      .get('/api/volunteer-history')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);  // Adjusted status check
    expect(response.body).toBeInstanceOf(Array);
  });
});
