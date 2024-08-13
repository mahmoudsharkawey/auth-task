-- create users table 
-- read more https://www.postgresqltutorial.com/postgresql-uuid/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);