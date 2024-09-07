export default async function createCurry(event, prisma) {
    const input = event.arguments?.input;
    console.log('Received input for creating curry:', JSON.stringify(input, null, 2));

    if (!input || !input.title) {
        console.error('Error: Missing required fields for creating curry.');
        return {
            __typename: 'ErrorResponse',
            errorType: 'BadRequest',
            message: 'Missing required fields for creating curry.',
        };
    }

    try {
        console.log(`Creating curry with title: ${input.title}`);

        const newCurry = await prisma.curry.create({
            data: {
                title: input.title,
                createAt: new Date(), 
                updatedAt: new Date(),
            },
        });

        console.log('Curry created successfully:', JSON.stringify(newCurry, null, 2));

        return {
            __typename: 'Curry',
            id: newCurry.id,
            title: newCurry.title,
            createAt: newCurry.createAt,
            updatedAt: newCurry.updatedAt,
        };

    } catch (error) {
        console.error('Failed to create curry:', error);

        return {
            __typename: 'ErrorResponse',
            errorType: 'InternalServerError',
            message: 'Internal server error occurred while creating the curry.',
        };
    }
}
