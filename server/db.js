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


console.log('DB_USER:', process.env.DB_USER);//check user 
console.log('Connected to PostgreSQL! ✅');//check if connected to postgress sucessfully
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_PORT:", process.env.DB_PORT);


export default pool;

