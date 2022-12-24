import Client from "../database";

export type OrderModel = {
  id?: Number;
  userId: Number;
  statusId: Number;
};
export type ProductOrderModel = {
  id?: Number;
  orderId: Number;
  productId: Number;
  quantity: Number;
};


export class Order {
  async index(): Promise<OrderModel[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }

  async show(id: string): Promise<OrderModel> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
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
        "INSERT INTO orders (userId, statusId) VALUES($1, $2, $3, 44) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.userId, b.statusId]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new order ${b.userId}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<OrderModel> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }


  async addProduct(b :ProductOrderModel): Promise<ProductOrderModel> {
    try {
      const sql = 'INSERT INTO productOrder (quantity, productId, orderId) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [b.quantity, b.productId, b.orderId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${b.productId} to order ${b.orderId}: ${err}`)
    }
  }
}
