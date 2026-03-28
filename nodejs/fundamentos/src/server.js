import http from "node:http";
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js";
import { routeHandler } from "./middlewares/routeHandler.js";

const PORT = process.env.PORT || 3333;

const server = http.createServer(async (req, res) => {
  // middleware
  await jsonBodyHandler(req, res);
  routeHandler(req, res);
});

server.listen(PORT);
