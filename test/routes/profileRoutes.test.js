import request from 'supertest';
import app from '../../server/app.js';
import * as profileController from '../../server/controllers/profileController.js';
import jwt from 'jsonwebtoken';

jest.mock('../../server/controllers/profileController.js'); // Mock the profileController module

describe('User Profile Routes', () => {
  let token;

  beforeAll(() => {
    // Mock token generation
    token = jwt.sign({ UserID: 1, UserType: 'user' }, 'your_jwt_secret');
  });

  test('should update a user profile', async () => {
    // Mock the updateProfile function
    profileController.updateProfile.mockImplementation((req, res) => {
      res.status(200).json({
        UserID: 1,
        FullName: 'Jane Doe',
        Address1: '456 Elm St',
        City: 'Othertown',
        State: 'TX',
        ZipCode: '67890',
        Skills: ['Gardening'],
        Availability: ['2024-07-01', '2024-07-05'],
      });
    });

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
    expect(response.body).toHaveProperty('FullName', 'Jane Doe');
  });

  test('should get a user profile', async () => {
    // Mock the getProfile function
    profileController.getProfile.mockImplementation((req, res) => {
      res.status(200).json({
        UserID: 1,
        FullName: 'John Doe',
        Address1: '123 Main St',
        City: 'Anytown',
        State: 'CA',
        ZipCode: '12345',
        Skills: ['Cooking', 'Teaching'],
        Availability: ['2024-06-15', '2024-06-20'],
      });
    });

    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('FullName', 'John Doe');
  });
});
