import Clinet from "../database";

export type ProductModel = {
  id?: Number;
  name: String;
  price: Number;
};

export class Product {
  async index(): Promise<ProductModel[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM product";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }

  async show(id: string): Promise<ProductModel> {
    try {
      const sql = "SELECT * FROM product WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(b: ProductModel): Promise<ProductModel> {
    try {
      const sql =
        "INSERT INTO product (name, price) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.price]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new book ${b.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<ProductModel> {
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
  // async index(): Promise<ProductModel[]> {
  //   try {
  //     const conn = await Clinet.connect();
  //     const sql = "select * from test_table";
  //     const result = await conn.query(sql);
  //     conn.release();
  //     return result.rows;
  //   } catch (err) {
  //     throw new Error("some thing went wrong " + err);
  //   }
  // }

  // async create(object: ProductModel): Promise<ProductModel[]> {
  //   try {
  //     const conn = await Clinet.connect();
  //     const sql = "select * from test_table";

  //   //   const hash =  bcrypt .hashSync(
  //   //     u.password + pepper,
  //   //     parseInt(saltRounds)
  //   //  );

  //     const result = await conn.query(sql);
  //     conn.release();
  //     return result.rows;
  //   } catch (err) {
  //     throw new Error("some thing went wrong " + err);
  //   }
  // }
}
