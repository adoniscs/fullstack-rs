import http from "node:http";

const PORT = process.env.PORT || 3333;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/products") {
    return res.end("Lista de produtos");
  }

  if (method === "POST" && url === "/products") {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    console.log(Buffer.concat(buffers).toString());

    return res.writeHead(201).end("Produto cadastrado!");
  }

  return res.writeHead(404).end("Produto não encontrado");
});

server.listen(PORT);
