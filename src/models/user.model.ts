import User from '../types/user.type';
import bcrypt from 'bcrypt';
import db from '../Database';
import config from '../config';

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 5);
  return bcrypt.hashSync(`${password} ${config.pepper}`, salt);
};

class UserModel {
  // create
  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      // eslint-disable-next-line quotes
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) returning id, email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create (${u.user_name}): ${(error as Error).message}`
      );
    }
  }
  //get all users
  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect();
      // eslint-disable-next-line quotes
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users`;
      const result = await connection.query(sql);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Error At retrieving users  ${(error as Error).message}`);
    }
  }
  //get specific user
  async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      // eslint-disable-next-line quotes
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=($1)`;
      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }
  // update user
  async updateOne(u: User): Promise<User[]> {
    try {
      const connection = await db.connect();
      // eslint-disable-next-line quotes
      const sql = `UPDATE users
       SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING id, email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
        u.id,
      ]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update user: ${u.user_name}, ${(error as Error).message}`
      );
    }
  }
  // delete user
  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      // eslint-disable-next-line quotes
      const sql = `DELETE FROM users WHERE id=($1) RETURNING id, email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `couldn't delete user ${id},  ${(error as Error).message}`
      );
    }
  }
  // authenticate user
}

export default UserModel;
