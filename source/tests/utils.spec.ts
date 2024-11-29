import { isNotification, isEmailNotification, isSMSNotification, badRequest } from '../notification/utils';
import { EmailNotification, SMSNotification } from '../notification/types';
import { APIGatewayProxyResult } from 'aws-lambda';

describe('Utils', () => {
    describe('isEmailNotification', () => {
        it('should return true for an email notification', () => {
            const emailNotification: EmailNotification = {
                id: '1',
                timestamp: new Date().toISOString(),
                type: 'email',
                recipient: 'test@example.com',
                subject: 'Test Subject',
                body: 'Test Body',
            };
            expect(isEmailNotification(emailNotification)).toBe(true);
        });

        it('should return false for a non-email notification', () => {
            const smsNotification: SMSNotification = {
                id: '1',
                timestamp: new Date().toISOString(),
                type: 'sms',
                phoneNumber: '+1234567890',
                message: 'Test Message',
            };
            expect(isEmailNotification(smsNotification)).toBe(false);
        });
    });

    describe('isSMSNotification', () => {
        it('should return true for an SMS notification', () => {
            const smsNotification: SMSNotification = {
                id: '2',
                timestamp: new Date().toISOString(),
                type: 'sms',
                phoneNumber: '+1234567890',
                message: 'Test SMS',
            };
            expect(isSMSNotification(smsNotification)).toBe(true);
        });

        it('should return false for a non-SMS notification', () => {
            const emailNotification: EmailNotification = {
                id: '2',
                timestamp: new Date().toISOString(),
                type: 'email',
                recipient: 'test@example.com',
                subject: 'Test Subject',
                body: 'Test Body',
            };
            expect(isSMSNotification(emailNotification)).toBe(false);
        });
    });

    describe('isNotification', () => {
        it('should return true for a valid email notification', () => {
            const emailNotification: EmailNotification = {
                id: '1',
                timestamp: new Date().toISOString(),
                type: 'email',
                recipient: 'test@example.com',
                subject: 'Subject',
                body: 'Body',
            };
            expect(isNotification(emailNotification)).toBe(true);
        });

        it('should return true for a valid SMS notification', () => {
            const smsNotification: SMSNotification = {
                id: '2',
                timestamp: new Date().toISOString(),
                type: 'sms',
                phoneNumber: '+1234567890',
                message: 'Test SMS',
            };
            expect(isNotification(smsNotification)).toBe(true);
        });

        it('should return false for an invalid notification object', () => {
            const invalidNotification = {
                id: 123,
                timestamp: new Date().toISOString(),
                type: 'sms',
                phoneNumber: '+1234567890',
                message: 'Test SMS',
            };
            expect(isNotification(invalidNotification)).toBe(false);
        });

        it('should return false for non-object inputs', () => {
            expect(isNotification(null)).toBe(false);
            expect(isNotification(undefined)).toBe(false);
            expect(isNotification(42)).toBe(false);
            expect(isNotification('not a notification')).toBe(false);
        });
    });

    describe('badRequest', () => {
        it('should return a 400 response with the correct message', () => {
            const message = 'Invalid input';
            const result: APIGatewayProxyResult = badRequest(message);
            expect(result.statusCode).toBe(400);
            expect(JSON.parse(result.body)).toEqual({ error: message });
        });
    });
});
