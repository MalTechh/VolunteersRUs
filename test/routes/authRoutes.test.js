import request from 'supertest';
import app from '../../server/app.js';

describe('Auth Routes', () => {
  let token;

  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({ email: 'newuser@example.com', password: 'password123' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered, verification email sent.');
  });

  test('should login a user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'newuser@example.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  test('should logout a user', async () => {
    const response = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logout successful.');
  });
});
