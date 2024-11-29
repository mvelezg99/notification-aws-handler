// @packages
import { SES } from 'aws-sdk';

const ses = new SES();

const senderEmail = 'mvelez.dev@gmail.com';

/**
 * Sends an email to the specified recipient with the given subject and body text using Amazon SES.
 * @param recipient Email address of the recipient that will receive the email
 * @param subject Subject of the email
 * @param body Body text of the email message to be sent, containing the email content
 */
export const sendEmail = async (recipient: string, subject: string, body: string) => {
    const params = {
        Source: senderEmail,
        Destination: { ToAddresses: [recipient] },
        Message: {
            Subject: { Data: subject },
            Body: { Text: { Data: body } },
        },
    };

    await ses.sendEmail(params).promise();
};
