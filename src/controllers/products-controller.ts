import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { z } from "zod";

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
    const bodySchema = z.object({
      name: z
        .string({ required_error: "Name is required!" })
        .trim()
        .min(4, { message: "Name must be 6 or more characters" }),
      price: z
        .number({ required_error: "Price is required!" })
        .positive({ message: "Price must be positive!" }),
    });

    const { name, price } = bodySchema.parse(request.body);

    /*
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
    */

    // throw new Error(" Erro ao tentar criar um produto");
    //throw new AppError("Erro ao tentar criar um produto")

    response.status(201).json({
      name,
      price,
      user_id: request.user_id,
    });
  }
}
