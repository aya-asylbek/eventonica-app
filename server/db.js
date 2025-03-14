import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user:'tpl522_13',
    host: '/tmp',
    database: 'eventonica',  // This will 'eventonica' from Postgres
    port: 5432
});


console.log('DB_USER:', process.env.DB_USER);
console.log('Connected to PostgreSQL! ✅');

export default pool;

