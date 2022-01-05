console.log(process.env.DATABASE_URL);
console.log(process.env.TYPEORM_ENTITIES);
module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["dist/app/models/*.js"],
  migrations: ["dist/database/migrations/*.js"],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationDir: ["src/database/migrations"],
    entitiesDir: "src/app/models/",
  },
};
