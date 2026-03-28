export async function jsonBodyHandler(req, res) {
  // adicionar cada chunk
  const buffers = [];

  // coleta os chunks de dados da requisição
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    // concatena os chunks e converter para string.
    // Em seguida converte a string para json
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  // define o header de resposta como json
  res.setHeader("Content-Type", "application/json");
}
