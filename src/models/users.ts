import Client from "../database";
import bcrypt from "bcryptjs";

export type UserModel = {
  id?: Number;
  firstName: String;
  lastName: String;
  password: String;
};

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS:  saltRounds} =
process?.env;

export class User {
  async index(): Promise<UserModel[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<UserModel> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(b: UserModel): Promise<UserModel> {
    try {
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(
        b.password + (pepper as string), 
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [b.firstName, b.lastName, hash]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new book ${b.firstName}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<UserModel> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
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
}
