import supertest from 'supertest';
import db from '../../database';
import app from '../../app';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import OrderProduct from '../../types/order-product.type';
import Order from '../../types/order.type';
import Product from '../../types/product.type';
import ProductModel from '../../models/product.model';
import OrderModel from '../../models/order.model';

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const request = supertest(app);
let token: string = '';

describe('Order Product API Endpoints', () => {
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
    price: 9.99,
    category: 'Electronics.'
  } as Product;

  const order = {
    userId: 1,
    status: 'active'
  } as Order;

  const orderProduct = {
    quantity: 1,
    orderId: 1,
    productId: 1
  } as OrderProduct;

  beforeAll(async () => {
    // setup user/product to test with
    await userModel.create(user);
    await productModel.create(product);
    await orderModel.create(order);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });

  describe('Test Authenticate method', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          userName: 'testUser',
          password: 'test123'
        });
      expect(res.status).toBe(200);
      const { id, email, token: userToken } = res.body.data;
      expect(id).toBe(1);
      expect(email).toBe('test@test.com');
      token = userToken;
    });
  });

  describe('Test CRUD API methods', () => {
    it('should create new order product', async () => {
      const res = await request
        .post('/api/order-products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(orderProduct);
      expect(res.status).toBe(200);
      const { id, quantity, orderId, productId } = res.body.data;
      expect(id).toBe(1);
      expect(quantity).toBe(1);
      expect(orderId).toBe(1);
      expect(productId).toBe(1);
    });

    it('should get list of order products', async () => {
      const res = await request
        .get('/api/order-products/1/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.orderProducts.length).toBe(1);
    });

    it('should get order product info', async () => {
      const res = await request
        .get('/api/order-products/1/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should update order product info', async () => {
      const res = await request
        .get('/api/order-products/1/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          productId: 1,
          orderId: 1,
          quantity: 2
        });
      const { id, productId, orderId, quantity } = res.body.data.orderProduct;

      expect(res.status).toBe(200);
      expect(id).toBe(1);
      expect(productId).toBe(1);
      expect(orderId).toBe(1);
      expect(quantity).toBe(1);
    });

    it('should delete order', async () => {
      const res = await request
        .delete('/api/order-products/1/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          productId: 1,
          orderId: 1
        });
      expect(res.status).toBe(200);
      expect(res.body.data.orderProduct.id).toBe(1);
    });
  });
});
