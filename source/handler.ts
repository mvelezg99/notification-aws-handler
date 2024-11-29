// @packages
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

// @scripts
import { NotificationProcessor } from './notification/processor';
import { badRequest, isNotification } from './notification/utils';

/**
 * Lambda function handler.
 * @description Processes a notification depending on its type (email or SMS) and sends it through the appropriate channel (email or SMS).
 *
 * @param event - The event object with the request data.
 * @returns A promise with the response object.
 */
export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return badRequest('Request body is required');
        }

        let data: unknown;

        try {
            data = JSON.parse(event.body);
        } catch {
            return badRequest('Invalid JSON format');
        }

        if (!isNotification(data)) {
            return badRequest('Invalid notification payload');
        }

        const processor = new NotificationProcessor();
        const result = await processor.process(data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: result }),
        };
    } catch {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
