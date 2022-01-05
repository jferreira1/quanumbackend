console.log(process.env.DATABASE_URL);
console.log(process.env.TYPEORM_ENTITIES);
module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: process.env.TYPEORM_ENTITIES,
  migrations: process.env.TYPEORM_MIGRATIONS,
  cli: {
    migrationDir: ["src/database/migrations"],
    entitiesDir: "src/app/models/",
  },
};
