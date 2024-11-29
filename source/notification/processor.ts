// @scripts
import { sendEmail } from './email';
import { sendSms } from './sms';
import { Notification } from './types';

/**
 * Notification processor class.
 */
export class NotificationProcessor {
    /**
     * Processes a notification depending on its type.
     *
     * @param notification - The notification object to process (email or SMS).
     * @returns A promise with the result of the process or an error if the notification type is not supported.
     */
    async process(notification: Notification) {
        if (notification.type === 'email') {
            await sendEmail(notification.recipient, notification.subject, notification.body);
            return `Email sent to ${notification.recipient}`;
        } else if (notification.type === 'sms') {
            await sendSms(notification.phoneNumber, notification.message);
            return `SMS sent to ${notification.phoneNumber}`;
        }
        throw new Error('Unsupported notification type');
    }
}
