import { NotificationProcessor } from '../notification/processor';
import { EmailNotification, Notification, SMSNotification } from '../notification/types';

jest.mock('aws-sdk', () => {
    return {
        SES: jest.fn().mockImplementation(() => ({
            sendEmail: jest.fn().mockReturnThis(),
            promise: jest.fn().mockResolvedValue({}),
        })),
        SNS: jest.fn().mockImplementation(() => ({
            publish: jest.fn().mockReturnThis(),
            promise: jest.fn().mockResolvedValue({}),
        })),
    };
});

describe('NotificationProcessor', () => {
    let processor: NotificationProcessor;

    beforeEach(() => {
        processor = new NotificationProcessor();
        jest.clearAllMocks(); // Clear any previous mock data
    });

    it('should process an email notification correctly', async () => {
        const emailNotification: EmailNotification = {
            id: '1',
            timestamp: new Date().toISOString(),
            type: 'email',
            recipient: 'test@example.com',
            subject: 'Test Subject',
            body: 'Test Body',
        };

        const result = await processor.process(emailNotification);

        expect(result).toBe(`Email sent to ${emailNotification.recipient}`);
    });

    it('should process an SMS notification correctly', async () => {
        const smsNotification: SMSNotification = {
            id: '2',
            timestamp: new Date().toISOString(),
            type: 'sms',
            phoneNumber: '+1234567890',
            message: 'Test SMS Message',
        };

        const result = await processor.process(smsNotification);

        expect(result).toBe(`SMS sent to ${smsNotification.phoneNumber}`);
    });

    it('should throw an error for unsupported notification types', async () => {
        const unsupportedNotification = {
            id: '3',
            timestamp: new Date().toISOString(),
            type: 'push', // Unsupported type
        } as unknown;

        await expect(processor.process(unsupportedNotification as unknown as Notification)).rejects.toThrow(
            'Unsupported notification type',
        );
    });
});
