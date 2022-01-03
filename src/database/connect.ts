import { createConnection } from "typeorm";

createConnection().then(() =>
  console.log("🔗 Succesfully connected to database")
);
