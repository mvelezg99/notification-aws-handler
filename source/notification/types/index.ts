export interface BaseNotification {
    id: string;
    timestamp: string;
}

export interface EmailNotification extends BaseNotification {
    type: 'email';
    recipient: string;
    subject: string;
    body: string;
}

export interface SMSNotification extends BaseNotification {
    type: 'sms';
    phoneNumber: string;
    message: string;
}

export type Notification = EmailNotification | SMSNotification;
