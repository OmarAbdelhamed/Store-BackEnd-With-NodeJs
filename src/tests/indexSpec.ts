import supertest from 'supertest';

import app from '../index';

const request = supertest(app);

describe('get request test', () => {
  it('the get / request', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
