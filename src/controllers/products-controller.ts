import { Request, Response } from "express";
import { AppError } from "../utils/app-error";

export class ProductsController {
  /**
   * Métodos necessários para este controller
   *
   * index  - GET para listar vários registros.
   * show   - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * remove - DELETE para deletar um registro.
   *
   * por default, são 5. Se for mais que isso, precisa de um novo controller
   */

  index(request: Request, response: Response) {
    const { page, limit } = request.query;

    response.send(`Página ${page} de ${limit}`);
  }

  create(request: Request, response: Response) {
    const { name, price } = request.body;

    if (!name) {
      throw new AppError("Nome do produto é obrigatório!");
    }

    if (name.trim().length < 4) {
      throw new AppError(
        "Nome do produto precisa ter pelo menos 4 caracteres!",
      );
    }

    if (!price) {
      throw new AppError("Preco do produto é obrigatório!");
    }

    if (price < 0) {
      throw new AppError("Preco do produto precisa ser maior que zero!");
    }

    // throw new Error(" Erro ao tentar criar um produto");
    //throw new AppError("Erro ao tentar criar um produto")

    response.status(201).json({
      name,
      price,
      user_id: request.user_id,
    });
  }
}
