import "reflect-metadata";
import { appConfig } from "@config/app.config";
import express from "express";
import { createServer } from "http";
import { errorHandler } from "./middlewares/error-handler";
import { router } from "./router";
import { container } from "tsyringe";
import { OrmProvider } from "@providers/orm/contracts/interfaces/orm.provider";
import "../../providers/index";

const start = () => {
  const ormProvider = container.resolve<OrmProvider>("OrmProvider");

  ormProvider.connect();

  const app = express();

  app.use(express.json());

  app.use(router);

  app.use(errorHandler);

  const server = createServer(app);

  server.listen(appConfig, () => {
    console.log(`App is running on port ${appConfig.port}`);
  });
};

start();
