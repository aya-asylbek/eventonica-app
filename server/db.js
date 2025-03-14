import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,  // This will 'eventonica' from Postgres
    port: process.env.DB_PORT,
});


console.log('DB_USER:', process.env.DB_USER);
console.log('Connected to PostgreSQL! ✅');

export default pool;

