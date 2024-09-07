import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createTicket(event) {
    console.log('Full event:', JSON.stringify(event, null, 2));

    const input = event.arguments?.input;
    const fieldName = event.info?.fieldName;
    
    console.log('Received input for creating ticket:', JSON.stringify(input, null, 2));
    console.log('Field name:', fieldName);

    // Remove these logs if they are no longer needed
    // console.log('Prisma object:', prisma);
    // console.log('Prisma ticket object:', prisma.ticket);
    // console.log('Prisma ticket create method:', prisma.ticket?.create);

    if (!input || !input.forDate || !input.curryId || !input.userId) {
        console.error('Error: Missing required fields for creating ticket.', input);

        return {
            __typename: 'ErrorResponse',
            errorType: 'BadRequest',
            message: 'Missing required fields for creating ticket.',
        };
    }

    const curryId = parseInt(input.curryId, 10);
    const userId = parseInt(input.userId, 10);

    if (isNaN(curryId) || isNaN(userId)) {
        console.error('Error: `curryId` or `userId` is not a valid integer.', { curryId, userId });

        return {
            __typename: 'ErrorResponse',
            errorType: 'BadRequest',
            message: 'Invalid `curryId` or `userId` provided.',
        };
    }

    try {
        console.log(`Creating ticket for date: ${input.forDate}, curryId: ${curryId}, userId: ${userId}`);

        const newTicket = await prisma.ticket.create({
            data: {
                fordate: new Date(input.forDate),
                curry_id: curryId,
                user_id: userId,
                createdat: new Date(),
                updatedat: new Date(),
            },
        });

        console.log('Ticket created successfully:', JSON.stringify(newTicket, null, 2));

        return {
            __typename: 'Ticket',
            id: newTicket.id,
            forDate: newTicket.fordate,
            curryId: newTicket.curry_id,
            userId: newTicket.user_id,
            createdAt: newTicket.createdat,
            updatedAt: newTicket.updatedat,
        };

    } catch (error) {
        console.error('Failed to create ticket:', error);

        return {
            __typename: 'ErrorResponse',
            errorType: 'InternalServerError',
            message: 'Internal server error occurred while creating the ticket.',
        };
    }
}
