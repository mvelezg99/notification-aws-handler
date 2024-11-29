// @packages
import { SNS } from 'aws-sdk';

const sns = new SNS();

/**
 * Sends an SMS message to the specified phone number using Amazon SNS.
 * @param phoneNumber Phone number of the recipient that will receive the SMS message
 * @param message Body text of the SMS message to be sent, containing the SMS content
 */
export const sendSms = async (phoneNumber: string, message: string) => {
    const params = {
        Message: message,
        PhoneNumber: phoneNumber,
    };

    await sns.publish(params).promise();
};
