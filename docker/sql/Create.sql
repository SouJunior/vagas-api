CREATE TABLE "Vagas" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" varchar,
  "type" varchar
);

const { Pool } = require("pg");

const pool = new Pool({
    user: "soujunior",
    password: "soujunior",
    host: "localhost",
    port: 5432,
    database: "soujunior"
  });

-- CREATE TABLE "Usuario" (
--   "id" integer PRIMARY KEY,
--   "name" varchar,
--   "username" varchar,
--   "password" varchar
-- );

-- CREATE TABLE "Denuncias" (
--   "id" integer PRIMARY KEY,
--   "description" varchar,
--   "vaga_id" int,
--   "usuario_id" int
-- );

-- ALTER TABLE "Vagas" ADD FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id");

-- ALTER TABLE "Denuncias" ADD FOREIGN KEY ("vaga_id") REFERENCES "Vagas" ("id");

-- ALTER TABLE "Denuncias" ADD FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id");
