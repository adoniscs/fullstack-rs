import { Router } from "express";
import { myMiddleware } from "../middlewares/my-middleware";
import { ProductsController } from "../controllers/products-controller";

const productsRoutes = Router();
const productsController = new ProductsController();

// obtendo dados
productsRoutes.get("/", productsController.index);

// middleware local em uma rota específica
// criar dados
productsRoutes.post("/", myMiddleware, productsController.create);

export { productsRoutes };
