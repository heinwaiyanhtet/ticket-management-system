// getUserByEmployeeId.js
export default async function getUserByEmployeeId(event, prisma) {
    const employeeid = event.arguments?.employeeId;
    console.log(`Extracted employeeId: ${employeeid}`);

    if (!employeeid) {
        console.error('Error: Employee ID is missing from the request.');
        return {
            __typename: 'ErrorResponse',
            errorType: 'BadRequest',
            message: 'Employee ID is required',
        };
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
            return {
                __typename: 'ErrorResponse',
                errorType: 'NotFound',
                message: `No user found with employeeId: ${employeeid}`,
            };
        }

        console.log('User found:', JSON.stringify(user, null, 2));

        return {
            __typename: 'User',
            id: user.id,
            status: user.status,
            name: user.name,
            department: user.department,
            employeeId: user.employeeid,
        };

    } catch (error) {
        console.error('Database query failed:', error);

        return {
            __typename: 'ErrorResponse',
            errorType: 'InternalServerError',
            message: 'Internal server error occurred while querying the database.',
        };
    }
}
