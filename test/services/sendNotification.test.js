import sgMail from '@sendgrid/mail';
import sendNotificationService from '../../server/services/sendNotification';
import UserCredentials from '../../server/models/UserCredentials';

jest.mock('@sendgrid/mail');
jest.mock('../../server/models/UserCredentials');

describe('sendNotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email notification successfully', async () => {
    UserCredentials.findOne.mockResolvedValue({
      id: 1,
      email: 'test@example.com'
    });

    sgMail.send.mockResolvedValue({});

    await sendNotificationService(1, 'Test message');

    expect(UserCredentials.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(sgMail.send).toHaveBeenCalledWith({
      to: 'test@example.com',
      from: 'malachirichlin@gmail.com',
      subject: 'Notification',
      text: 'Test message',
      html: '<p>Test message</p>'
    });
    expect(sgMail.send).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the user is not found', async () => {
    UserCredentials.findOne.mockResolvedValue(null);

    await expect(sendNotificationService(1, 'Test message')).rejects.toThrow('Failed to send notification.');

    expect(UserCredentials.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(sgMail.send).not.toHaveBeenCalled();
  });

  it('should throw an error if sending email fails', async () => {
    UserCredentials.findOne.mockResolvedValue({
      id: 1,
      email: 'test@example.com'
    });

    sgMail.send.mockRejectedValue(new Error('SendGrid error'));

    await expect(sendNotificationService(1, 'Test message')).rejects.toThrow('Failed to send notification.');

    expect(UserCredentials.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(sgMail.send).toHaveBeenCalledTimes(1);
  });
});
