import sendVerificationEmail from '../../server/services/sendVerificationEmail.js';

describe('Send Verification Email', () => {
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

  test('should send a verification email', async () => {
    const userEmail = 'user@example.com';
    const verificationLink = 'http://example.com/verify?token=fakeToken';

    await sendVerificationEmail(userEmail, verificationLink);

    expect(mockSend).toHaveBeenCalledWith({
      to: userEmail,
      from: 'no-reply@example.com',
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
      html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`,
    });
  });
});
