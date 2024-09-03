export const handler = async (event) =>
{
  console.log('Received event:', event);

  if (event.field === 'getGreeting') {
    const { name } = event.arguments;
    return `Hello, ${name || 'World'}!`;
  }

  return `Unknown field: ${event.field}`;
  
};




