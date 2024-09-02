export const handler = async (event) => {
  console.log('Received event:', event);

  // Process the request based on the field name
  if (event.field === 'getGreeting') {
    const { name } = event.arguments;
    return `Hello, ${name || 'World'}!`;
  }

  // Handle unknown fields
  return `Unknown field: ${event.field}`;
};
