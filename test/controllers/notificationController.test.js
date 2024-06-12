import { sendNotification } from '../../server/controllers/notificationController.js';
import Notification from '../../server/models/Notification.js';

describe('Notification Controller', () => {
  let req, res;

  beforeAll(async () => {
    await Notification.sync({ force: true }); // Ensure the table is created and empty
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

  test('should send a notification', async () => {
    req.body = {
      userId: 1,
      message: 'You have a new event assignment.',
    };

    await sendNotification(req, res);

    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });
});
