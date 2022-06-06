import supertest from 'supertest';
import db from '../../Database';
import app from '../../index';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('Orders API Endpoints', () => {
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
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
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
        .post('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: 1,
          status: 'active',
        });
      expect(res.status).toBe(200);
      const { id, status, userId } = res.body.data;
      expect(id).toBe(1);
      expect(status).toBe('active');
      expect(userId).toBe(1);
    });

    it('should get list of orders', async () => {
      const res = await request
        .get('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.orders.length).toBe(1);
      expect(res.body.data.orders[0].status).toBe('active');
      expect(res.body.data.orders[0].userId).toBe(1);
      expect(res.body.data.orders[0].userName).toBe('testUser');
    });

    it('should get order info', async () => {
      const res = await request
        .get('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.order.id).toBe(1);
      expect(res.body.data.order.status).toBe('active');
      expect(res.body.data.order.userId).toBe(1);
      expect(res.body.data.order.userName).toBe('testUser');
    });

    it('should get order info for current user', async () => {
      const res = await request
        .get('/api/orders/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.order.id).toBe(1);
      expect(res.body.data.order.status).toBe('active');
      expect(res.body.data.order.userId).toBe(1);
      expect(res.body.data.order.userName).toBe('testUser');
    });

    it('should update order info', async () => {
      const res = await request
        .patch('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          userId: 1,
          status: 'active',
        });

      const { id, status, userId } = res.body.data.order;

      expect(res.status).toBe(200);
      expect(id).toBe(1);
      expect(status).toBe('active');
      expect(userId).toBe(1);
    });

    it('should delete order', async () => {
      const res = await request
        .delete('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.order.id).toBe(1);
    });
  });
});
