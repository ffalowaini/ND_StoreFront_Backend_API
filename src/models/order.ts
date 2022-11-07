import Client from "../database";

export type OrderModel = {
  id?: Number;
  productId: Number;
  userId: Number;
  statusId: Number;
  quantity: Number;
};

export class Order {
  async index(): Promise<OrderModel[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM order";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }

  async show(id: string): Promise<OrderModel> {
    try {
      const sql = "SELECT * FROM order WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(b: OrderModel): Promise<OrderModel> {
    try {
      const sql =
        "INSERT INTO product (productId, quantity, userId, statusId) VALUES($1, $2, $3, 44) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.productId, b.quantity, b.userId, b.statusId]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new book ${b.productId}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<OrderModel> {
    try {
      const sql = "DELETE FROM product WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }


  // async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderModel> {
  //   try {
  //     const sql = 'INSERT INTO order (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
  //     //@ts-ignore
  //     const conn = await Client.connect()

  //     const result = await conn
  //         .query(sql, [quantity, orderId, productId])

  //     const order = result.rows[0]

  //     conn.release()

  //     return order
  //   } catch (err) {
  //     throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
  //   }
  // }
}
