import prisma from './src/utils/prisma.mjs'; // Use default import from prisma.js
import getUserByEmployeeId from './src/handlers/getUserByEmployeeId.mjs';
import createEmployee from './src/handlers/createEmployee.mjs';
import createTicket from './src/handlers/createTicket.mjs';

export const handler = async (event) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    // Safely access fieldName with a default value and log potential missing info
    const fieldName = event.fieldName;

    if (!fieldName) {

        console.error('Error: Missing fieldName in event.info. Full event:', JSON.stringify(event, null, 2));
        return {
            __typename: 'ErrorResponse',
            errorType: 'BadRequest',
            message: 'Invalid request structure: Missing fieldName in event.info.',
        };
    }

    console.log(`Invoked field name: ${fieldName}`);

    try {


            if (fieldName === 'getUserByEmployeeId') 
            {
                console.log('Processing getUserByEmployeeId request...');
                const response = await getUserByEmployeeId(event, prisma);
                console.log('getUserByEmployeeId response:', JSON.stringify(response, null, 2));
                return response;
            } 

            else if (fieldName === 'createEmployee') {
                console.log('Processing createEmployee request...');
                const response = await createEmployee(event, prisma);
                console.log('createEmployee response:', JSON.stringify(response, null, 2));
                return response;
            } 

            else if(fieldName === 'createTicket') 
            {
                console.log('Processing create ticket request...');
                const response = await createTicket(event, prisma);
                console.log('create ticket response:', JSON.stringify(response, null, 2));
                return response;
            }

            else
            {
                console.error('Error: Unknown field name invoked:', fieldName);
                return {
                    __typename: 'ErrorResponse',
                    errorType: 'UnknownField',
                    message: 'Unknown field name invoked.',
                };
            }

    } catch (error) {
        console.error('Error processing request:', error);
        return {
            __typename: 'ErrorResponse',
            errorType: 'InternalServerError',
            message: 'An error occurred while processing the request.',
        };
    } finally {
        try {
            await prisma.$disconnect();
            console.log('Prisma client disconnected successfully.');
        } catch (disconnectError) {
            console.error('Error during Prisma client disconnection:', disconnectError);
        }
    }
};
