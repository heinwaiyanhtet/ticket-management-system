import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handler = async (event) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    const employeeid = event.arguments?.employeeId;
    console.log(`Extracted employeeId: ${employeeid}`);

    if (!employeeid) {
        console.error('Error: Employee ID is missing from the request.');
        const errorResponse = {
            __typename: 'ErrorResponse',
            errorType: 'BadRequest',
            message: 'Employee ID is required',
        };
        console.log('Returning ErrorResponse:', JSON.stringify(errorResponse));
        return errorResponse;
    }

    try {
        console.log(`Querying database for employeeId: ${employeeid}`);

        const user = await prisma.users.findFirst({
            where: {
                employeeid: parseInt(employeeid, 10),
            },
        });

        if (!user) {
            console.warn(`No user found with employeeId: ${employeeid}`);
            const notFoundResponse = {
                __typename: 'ErrorResponse',
                errorType: 'NotFound',
                message: `No user found with employeeId: ${employeeid}`,
            };
            console.log('Returning ErrorResponse:', JSON.stringify(notFoundResponse));
            return notFoundResponse;
        }

        console.log('User found:', JSON.stringify(user, null, 2));

        const userResponse = {
            __typename: 'User',
            id: user.id,
            status: user.status,
            name: user.name,
            department: user.department,
            employeeId: user.employeeid,
        };

        console.log('Returning User response:', JSON.stringify(userResponse));
        return userResponse;

    } catch (error) {
        console.error('Database query failed:', error);

        const internalErrorResponse = {
            __typename: 'ErrorResponse',
            errorType: 'InternalServerError',
            message: 'Internal server error occurred while querying the database.',
        };
        console.log('Returning ErrorResponse:', JSON.stringify(internalErrorResponse));
        return internalErrorResponse;
        
    } finally {
        try {
            await prisma.$disconnect();
            console.log('Prisma client disconnected successfully.');
        } catch (disconnectError) {
            console.error('Error during Prisma client disconnection:', disconnectError);
        }
    }

};


// query getUserByEmployeeId {
//   getUserByEmployeeId(employeeId: 123) {
//     ... on User {
//       id
//       status
//       name
//       department
//       employeeId
//     }
//     ... on ErrorResponse {
//       errorType
//       message
//     }
//   }
// }
