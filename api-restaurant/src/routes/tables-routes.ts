import { Router } from "express";
import { TablesController } from "@/controllers/tables-controller";

const tablesRoutes = Router();
const tablesControllers = new TablesController();

tablesRoutes.get("/", tablesControllers.index);

export { tablesRoutes };
