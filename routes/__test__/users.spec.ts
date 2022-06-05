import supertest from 'supertest';
import db from '../../database';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import app from '../../app';

const userModel = new UserModel();
const request = supertest(app);
let token: string = '';

describe('User API Endpoints', () => {
  beforeAll(async () => {
    const user = {
      email: 'test@test.com',
      userName: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      password: 'test123'
    } as User;

    await userModel.create(user);
  });
  afterAll(async () => {
    // clean db
    const connection = await db.connect();
    const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
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
    it('should create new user', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'test2@test2.com',
          userName: 'testUser2',
          firstName: 'Test2',
          lastName: 'User2',
          password: 'test123'
        });
      expect(res.status).toBe(200);
      const { id, email, userName, firstName, lastName } = res.body.data;
      expect(id).toBe(2);
      expect(email).toBe('test2@test2.com');
      expect(userName).toBe('testUser2');
      expect(firstName).toBe('Test2');
      expect(lastName).toBe('User2');
    });

    it('should delete user', async () => {
      const res = await request
        .delete('/api/users/2')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.user.id).toBe(2);
      expect(res.body.data.user.userName).toBe('testUser2');
    });

    it('should get list of users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.users.length).toBe(1);
    });

    it('should get user info', async () => {
      const res = await request
        .get('/api/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.user.userName).toBe('testUser');
      expect(res.body.data.user.email).toBe('test@test.com');
    });

    it('should update user info', async () => {
      const res = await request
        .patch('/api/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          email: 'mo@elzanaty.com',
          userName: 'mohammedelzanaty',
          firstName: 'Mohammed',
          lastName: 'Elzanaty',
          password: 'test123'
        });
      expect(res.status).toBe(200);

      const { id, email, userName, firstName, lastName } = res.body.data.user;
      expect(id).toBe(1);
      expect(email).toBe('mo@elzanaty.com');
      expect(userName).toBe('mohammedelzanaty');
      expect(firstName).toBe('Mohammed');
      expect(lastName).toBe('Elzanaty');
    });
  });
});
