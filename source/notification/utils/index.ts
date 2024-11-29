// @packages
import { APIGatewayProxyResult } from 'aws-lambda';

// @scripts
import { EmailNotification, Notification, SMSNotification } from '../types';

export function isEmailNotification(notification: Notification): notification is EmailNotification {
    return notification.type === 'email';
}

export function isSMSNotification(notification: Notification): notification is SMSNotification {
    return notification.type === 'sms';
}

export const isNotification = (data: unknown): data is Notification => {
    if (typeof data !== 'object' || data === null) return false;

    const notification = data as Notification;
    return (
        typeof notification.id === 'string' &&
        typeof notification.timestamp === 'string' &&
        (notification.type === 'email' || notification.type === 'sms') &&
        ((notification.type === 'email' &&
            typeof notification.recipient === 'string' &&
            typeof notification.subject === 'string' &&
            typeof notification.body === 'string') ||
            (notification.type === 'sms' &&
                typeof notification.phoneNumber === 'string' &&
                typeof notification.message === 'string'))
    );
};

export const badRequest = (message: string): APIGatewayProxyResult => ({
    statusCode: 400,
    body: JSON.stringify({ error: message }),
});
