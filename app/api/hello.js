const { db } = require('@vercel/postgres');

export default async function handler(request, response) {
  const client = await db.connect();

  try {
    // Ensure the "uuid-ossp" extension is created
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create the "users" table if it doesn't exist
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

    // Additional logic for handling the result if needed
    // For example: console.log(createTable);
  } finally {
    // Release the database client when done
    await client.end();
  }
}
