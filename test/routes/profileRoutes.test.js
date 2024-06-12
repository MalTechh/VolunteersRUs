import request from 'supertest';
import app from '../../server/app.js';

describe('User Profile Routes', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'newuser@example.com', password: 'password123' });
    token = response.body.token;
  });

  test('should update a user profile', async () => {
    const response = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fullName: 'Jane Doe',
        address1: '456 Elm St',
        city: 'Othertown',
        state: 'TX',
        zipCode: '67890',
        skills: ['Gardening'],
        availability: ['2024-07-01', '2024-07-05'],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('fullName', 'Jane Doe');
  });

  test('should get a user profile', async () => {
    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('fullName');
  });
});
