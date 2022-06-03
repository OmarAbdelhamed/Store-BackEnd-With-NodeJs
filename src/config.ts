import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env);

const {
  PORT,
  NODE_ENV,
  PGHOST,
  PGPORT,
  PGDATABASE,
  PGDATABASE_TEST,
  PGUSER,
  PGPASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
} = process.env;

export default {
  port: PORT,
  host: PGHOST,
  dbport: PGPORT,
  database: NODE_ENV === 'dev' ? PGDATABASE : PGDATABASE_TEST,
  user: PGUSER,
  password: PGPASSWORD,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
};
