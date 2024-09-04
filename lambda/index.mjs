// index.mjs
import prisma from './src/utils/prisma.mjs'; // Use default import from prisma.js
import getUserByEmployeeId from './src/handlers/getUserByEmployeeId.mjs';
import createEmployee from './src/handlers/createEmployee.mjs';

export const handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const { fieldName } = event.info;
    console.log(`Invoked field name: ${fieldName}`);

    try {
        if (fieldName === 'getUserByEmployeeId') {

            return await getUserByEmployeeId(event, prisma);

        } else if (fieldName === 'createEmployee') {

            return await createEmployee(event, prisma);

        } else 
        {
            console.error('Error: Unknown field name invoked.');

            return {
                __typename: 'ErrorResponse',
                errorType: 'UnknownField',
                message: 'Unknown field name invoked.',
            };

        }
    } finally {
        try {
            
            await prisma.$disconnect();
            console.log('Prisma client disconnected successfully.');

        } catch (disconnectError) {
            console.error('Error during Prisma client disconnection:', disconnectError);
        }
    }
};
