import { handler } from '../handler';
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

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

describe('Lambda Handler', () => {
    const mockContext = {} as Context;

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should return 400 if no body is provided', async () => {
        const event = {
            body: null,
        } as unknown as APIGatewayProxyEvent;

        const response = (await handler(event, mockContext, () => null)) as APIGatewayProxyResult;
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ error: 'Request body is required' });
    });

    it('should process email notification correctly', async () => {
        const event = {
            body: JSON.stringify({
                id: '1',
                timestamp: new Date().toISOString(),
                type: 'email',
                recipient: 'test@example.com',
                subject: 'Test Subject',
                body: 'Test Body',
            }),
        } as APIGatewayProxyEvent;

        const response = (await handler(event, mockContext, () => null)) as APIGatewayProxyResult;
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({
            message: 'Email sent to test@example.com',
        });
    });

    it('should process SMS notification correctly', async () => {
        const event = {
            body: JSON.stringify({
                id: '2',
                timestamp: new Date().toISOString(),
                type: 'sms',
                phoneNumber: '+1234567890',
                message: 'Test SMS Message',
            }),
        } as APIGatewayProxyEvent;

        const response = (await handler(event, mockContext, () => null)) as APIGatewayProxyResult;
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({
            message: 'SMS sent to +1234567890',
        });
    });

    it('should return 500 for unsupported notification types', async () => {
        const event = {
            body: JSON.stringify({
                id: '3',
                timestamp: new Date().toISOString(),
                type: 'push',
            }),
        } as APIGatewayProxyEvent;

        const response = (await handler(event, mockContext, () => null)) as APIGatewayProxyResult;

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ error: 'Invalid notification payload' });
    });

    it('should return 400 for invalid JSON', async () => {
        const event = {
            body: '{invalid-json}',
        } as APIGatewayProxyEvent;

        const response = (await handler(event, mockContext, () => null)) as APIGatewayProxyResult;
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ error: 'Invalid JSON format' });
    });
});
