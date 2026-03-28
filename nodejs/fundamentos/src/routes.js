export const routes = [
  {
    method: "GET",
    path: "/products",
    controller: (req, res) => {
      return res.end("Lista de produtos");
    },
  },
  {
    method: "POST",
    path: "/products",
    controller: (req, res) => {
      return res.writeHead(201).end(JSON.stringify(req.body));
    },
  },
];
