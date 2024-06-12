import Notification from '../../server/models/Notification.js';

describe('Notifications Model', () => {
  beforeAll(async () => {
    await Notification.sync({ force: true }); // Ensure the table is created and empty
  });

  test('should create a new notification', async () => {
    const notification = await Notification.create({
      userId: 1,
      message: 'You have a new event assignment.',
    });

    expect(notification.message).toBe('You have a new event assignment.');
  });

  test('should not create a notification without required fields', async () => {
    try {
      await Notification.create({
        userId: 1,
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
