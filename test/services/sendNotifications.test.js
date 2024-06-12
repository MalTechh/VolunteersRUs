import sendNotification from '../../server/services/sendNotification.js';

describe('Send Notifications', () => {
  let mockSend;

  beforeEach(() => {
    mockSend = jest.fn();
    jest.mock('@sendgrid/mail', () => ({
      setApiKey: jest.fn(),
      send: mockSend,
    }));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('should send a notification email', async () => {
    const userEmail = 'user@example.com';
    const message = 'You have a new event assignment.';

    await sendNotification(userEmail, message);

    expect(mockSend).toHaveBeenCalledWith({
      to: userEmail,
      from: 'no-reply@example.com',
      subject: 'Notification',
      text: message,
      html: `<p>${message}</p>`,
    });
  });
});
