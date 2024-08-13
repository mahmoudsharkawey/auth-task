import db from "../database/index";
import User from "../types/user.type";
import config from "../config";
import bcrypt from "bcrypt";
class UserModel {
  // create new user
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, password) 
                    values ($1, $2) 
                    RETURNING  id, email,password`;
      const salt = parseInt(config.slatRange as string);
      const result = await connection.query(sql, [
        u.email,
        await bcrypt.hashSync(`${u.password}`, salt),
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${u.email}): ${(error as Error).message}`
      );
    }
  }

  // login specific user
  async findOne(email: string): Promise<User> {
    try {
      const sql = "SELECT id, email, password FROM users WHERE email = $1";
      const connection = await db.connect();
      const createdAt = new Date();
      const result = await connection.query(sql, [email]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not find user with email ${email}, ${(error as Error).message}`
      );
    }
  }

  // authenticate
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = "SELECT password FROM users WHERE email=$1";
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            "SELECT id, email FROM users WHERE email=($1)",
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
