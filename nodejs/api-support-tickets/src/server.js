import http from "node:http";
import { jsonHandler } from "./middlewares/jsonHandler.js";
import { routeHandler } from "./middlewares/routeHandler.js";

const PORT = process.env.PORT || 3333;

async function listener(req, res) {
  await jsonHandler(req, res);
  routeHandler(req, res);
}

http.createServer(listener).listen(PORT);
