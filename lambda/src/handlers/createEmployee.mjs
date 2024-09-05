// createEmployee.js
export default async function createEmployee(event, prisma)
{
    const input = event.arguments?.input;
    console.log('Received input for creating employee:', JSON.stringify(input, null, 2));

    if (!input || !input.employeeId || !input.name || !input.status) {
        console.error('Error: Missing required fields for creating employee.');
        return {
            __typename: 'ErrorResponse',
            errorType: 'BadRequest',
            message: 'Missing required fields for creating employee.',
        };
    }

    try {
        console.log(`Creating employee with employeeId: ${input.employeeId}`);

        const newUser = await prisma.users.create({
            data: {
                status: 'employee',
                name: input.name,
                department: input.department,
                employeeid: input.employeeId,
            },
        });

        console.log('Employee created successfully:', JSON.stringify(newUser, null, 2));

        return {
            __typename: 'User',
            id: newUser.id,
            status: 'employee',
            name: newUser.name,
            department: newUser.department,
            employeeId: newUser.employeeid,
        };

    } catch (error) {
        console.error('Failed to create employee:', error);

        return {
            __typename: 'ErrorResponse',
            errorType: 'InternalServerError',
            message: 'Internal server error occurred while creating the employee.',
        };
    }
}
