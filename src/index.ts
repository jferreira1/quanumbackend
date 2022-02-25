import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger/swagger.json";
import cors from "cors";

import "./database/connect";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(routes);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT || 3000, () =>
  console.log("🔥 Server is running at http://localhost:3000")
);
