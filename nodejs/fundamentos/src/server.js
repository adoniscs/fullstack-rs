import http from "node:http";
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js";

const PORT = process.env.PORT || 3333;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // middleware
  await jsonBodyHandler(req, res);

  if (method === "GET" && url === "/products") {
    return res.end("Lista de produtos");
  }

  if (method === "POST" && url === "/products") {
    return res.writeHead(201).end(JSON.stringify(req.body));
  }

  return res.writeHead(404).end("Produto não encontrado");
});

server.listen(PORT);
