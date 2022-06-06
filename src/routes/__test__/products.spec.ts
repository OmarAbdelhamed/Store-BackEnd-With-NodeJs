import supertest from 'supertest';
import db from '../../Database';
import app from '../../index';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('Products API Endpoints', () => {
  beforeAll(async () => {
    const user = {
      email: 'test@test.com',
      userName: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      password: 'test123',
    } as unknown as User;

    await userModel.create(user);
  });
  afterAll(async () => {
    // clean db
    const connection = await db.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1';
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
          password: 'test123',
        });
      expect(res.status).toBe(200);
      const { id, email, token: userToken } = res.body.data;
      expect(id).toBe(1);
      expect(email).toBe('test@test.com');
      token = userToken;
    });
  });

  describe('Test CRUD API methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'product name',
          description: 'product description',
          price: 9.99,
          category: 'Electronics.',
        });
      expect(res.status).toBe(200);
      const { id, name, description, price, category } = res.body.data;
      expect(id).toBe(1);
      expect(name).toBe('product name');
      expect(description).toBe('product description');
      expect(price).toBe(9.99);
      expect(category).toBe('Electronics.');
    });

    it('should get list of products', async () => {
      const res = await request
        .get('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.products.length).toBe(1);
    });

    it('should get product info', async () => {
      const res = await request
        .get('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.product.id).toBe(1);
    });

    it('should update product info', async () => {
      const res = await request
        .patch('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          name: 'product name',
          description: 'product description',
          price: 20,
          category: 'Electronics.',
        });

      const { id, name, description, price, category } = res.body.data.product;

      expect(res.status).toBe(200);
      expect(id).toBe(1);
      expect(name).toBe('product name');
      expect(description).toBe('product description');
      expect(price).toBe(20);
      expect(category).toBe('Electronics.');
    });

    it('should delete product', async () => {
      const res = await request
        .delete('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.product.id).toBe(1);
    });
  });
});
