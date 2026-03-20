import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { knex } from "@/database/knex";
import { z } from "zod";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body,
      );

      const session = await knex<TablesSessionsRepository>("tables_session")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("session table not found");
      }

      if (session.closed_at) {
        throw new AppError("this table is closed");
      }

      const produt = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      if (!produt) {
        throw new AppError("product not fount");
      }

      await knex<OrderRespository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: produt.price,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
