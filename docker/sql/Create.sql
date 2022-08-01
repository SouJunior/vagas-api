CREATE TABLE "Vagas" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "description" varchar,
  "usuario_id" int
);

CREATE TABLE "Usuario" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "username" varchar,
  "password" varchar
);

CREATE TABLE "Denuncias" (
  "id" integer PRIMARY KEY,
  "description" varchar,
  "vaga_id" int,
  "usuario_id" int
);

ALTER TABLE "Vagas" ADD FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id");

ALTER TABLE "Denuncias" ADD FOREIGN KEY ("vaga_id") REFERENCES "Vagas" ("id");

ALTER TABLE "Denuncias" ADD FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id");
