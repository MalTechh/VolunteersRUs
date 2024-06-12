import sendVerificationEmail from '../../server/services/sendVerificationEmail.js';
import * as sgMail from '@sendgrid/mail';

jest.mock('@sendgrid/mail');

describe('Send Verification Email Service', () => {
  test('should send a verification email', async () => {
    sgMail.send.mockResolvedValue({});
    const email = 'test@example.com';
    await sendVerificationEmail(email);
    expect(sgMail.send).toHaveBeenCalledWith(expect.objectContaining({ to: email }));
  });
});
