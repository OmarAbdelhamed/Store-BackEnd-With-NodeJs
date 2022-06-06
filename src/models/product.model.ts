/* eslint-disable class-methods-use-this */
import db from '../Database';
import Product from '../types/product.type';

class ProductModel {
  private formatProduct(product: {
    id?: number | undefined;
    name: string;
    description: string;
    price: string;
    category: string;
  }): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: +product.price,
      category: product.category,
    };
  }

  async create(p: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql =
        'INSERT INTO  products (name, description, price, category) values ($1, $2, $3, $4) RETURNING *';

      const result = await connection.query(sql, [
        p.name,
        p.description,
        p.price,
        p.category,
      ]);

      connection.release();

      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not create product ${(err as Error).message}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows.map((p) => this.formatProduct(p));
    } catch (err) {
      throw new Error(`Error at retrieving products ${(err as Error).message}`);
    }
  }

  async edit(p: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql =
        'UPDATE products SET name=$1, description=$2, price=$3, category=$4 WHERE id=$5 RETURNING *';
      const result = await connection.query(sql, [
        p.name,
        p.description,
        p.price,
        p.category,
        p.id,
      ]);
      connection.release();
      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(
        `Could not update product ${p.name}, ${(err as Error).message}`
      );
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';

      const result = await connection.query(sql, [id]);

      connection.release();

      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(
        `Could not delete product ${id}. ${(err as Error).message}`
      );
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';

      const connection = await db.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(
        `Could not find product ${id}. ${(err as Error).message}`
      );
    }
  }
}

export default ProductModel;
