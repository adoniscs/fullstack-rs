import http from "node:http";

const PORT = process.env.PORT || 3333;

function listener(req, res) {}

http.createServer(listener).listen(PORT);
