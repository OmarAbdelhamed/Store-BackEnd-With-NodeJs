/* eslint-disable quotes */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import db from '../Database';
import Error from '../interfaces/error.interface';
import OrderProduct from '../types/order-product.type';
import Order from '../types/order.type';

class OrderModel {
  private formatOrder(order: {
    id?: number | undefined;
    status: string;
    user_id: string;
    user_name?: string;
    products: OrderProduct[];
  }): Order {
    return {
      id: order.id,
      status: order.status,
      userId: +order.user_id,
      userName: order.user_name,
      products:
        Array.isArray(order.products) &&
        order.products.length > 0 &&
        order.products[0]?.quantity
          ? order.products
          : [],
    };
  }

  async create(o: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql =
        'INSERT INTO orders (user_id, status) values ($1, $2) RETURNING *';

      const result = await connection.query(sql, [o.userId, o.status]);

      const order = result.rows[0];

      connection.release();

      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id,
      };
    } catch (err) {
      throw new Error(`Could not create order ${(err as Error).message}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql =
        // eslint-disable-next-line prettier/prettier
        "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.user_name, o.status";
      const result = await connection.query(sql);
      connection.release();
      return result.rows.map((o) => this.formatOrder(o));
    } catch (err) {
      throw new Error(`Error at retrieving products ${(err as Error).message}`);
    }
  }

  async edit(o: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql =
        'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *';
      const result = await connection.query(sql, [o.userId, o.status, o.id]);

      const order = result.rows[0];

      connection.release();

      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id,
      };
    } catch (err) {
      throw new Error(
        `Could not update product ${o.id}. ${(err as Error).message}`
      );
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';

      const result = await connection.query(sql, [id]);

      const order = result.rows[0];

      connection.release();

      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id,
      };
    } catch (err) {
      throw new Error(
        `Could not delete order ${id}. ${(err as Error).message}`
      );
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql =
        // eslint-disable-next-line quotes
        "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.id = $1 GROUP BY o.id, u.user_name, o.status, o.user_id";

      const connection = await db.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return this.formatOrder(result.rows[0]);
    } catch (err) {
      const error: Error = new Error(
        `Could not find order with ${id}. Error: ${err}`
      );
      error.status = 404;
      throw error;
    }
  }

  async getOrderByUserId(userId: number): Promise<Order> {
    try {
      const sql =
        "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.user_id = $1 AND o.status = 'active' GROUP BY o.id, u.user_name, o.status, o.user_id";

      const connection = await db.connect();
      const result = await connection.query(sql, [userId]);

      connection.release();
      return this.formatOrder(result.rows[0]);
    } catch (err) {
      throw new Error(
        `Could not find order for userId ${userId}. ${(err as Error).message}`
      );
    }
  }
}

export default OrderModel;
