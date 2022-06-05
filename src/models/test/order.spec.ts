import db from '../../database';
import User from '../../types/user.type';
import Product from '../../types/product.type';
import Order from '../../types/order.type';
import OrderModel from '../order.model';
import UserModel from '../user.model';
import ProductModel from '../product.model';

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe('Order Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(orderModel.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(orderModel.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(orderModel.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(orderModel.delete).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const user = {
      email: 'test@test.com',
      userName: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      password: 'test123'
    } as User;

    const product = {
      name: 'product name',
      description: 'product description',
      price: 20,
      category: 'Electronics.'
    } as Product;

    const order = {
      userId: 1,
      status: 'active'
    } as Order;

    beforeAll(async () => {
      // setup user/product to test with
      await userModel.create(user);
      await productModel.create(product);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should add an order', async () => {
      const createdOrder = await orderModel.create(order);
      expect(createdOrder.id).toEqual(1);
    });

    it('Index method should return a list of orders', async () => {
      const orders = await orderModel.index();
      expect(orders[0].id).toBe(1);
    });

    it('Show method should return the correct order', async () => {
      const returnedOrder = await orderModel.show(1);
      expect(returnedOrder.id).toEqual(1);
    });

    it('Edit method should return an order with edited attributes', async () => {
      const returnedOrder = await orderModel.edit({
        id: 1,
        userId: 1,
        status: 'completed'
      });
      expect(returnedOrder.status).toBe('completed');
    });

    it('Delete method should remove the order', async () => {
      const deletedOrder = await orderModel.delete(1);
      expect(deletedOrder.id).toBe(1);
    });
  });
});
