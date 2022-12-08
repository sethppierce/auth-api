'use strict';

const { db, users } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

let testUser;

beforeAll( async () => {
  await db.sync();
  testUser = await users.create({
    username: 'test', 
    password: 'pass',
    role: 'admin',
  });
});

afterAll( async () => {
  await db.drop();
});

describe('V2 route with ACL access', () => {
  it('allows user with create access to post', async () => {
    let response = await request.post('/api/v2/food').set('Authorization', `Bearer ${testUser.token}`).send({
      name: 'test',
      calories: 2,
      type: 'fruit',
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual('test');
    expect(response.body.calories).toEqual(2);
    expect(response.body.type).toEqual('fruit');
  });
  it('allows user with read access to get one item', async () => {
    let response = await request.get('/api/v2/food/1').set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.calories).toEqual(2);
    expect(response.body.type).toEqual('fruit');
  });
  it('allows user with read access to get all items', async () => {
    let response2 = await request.post('/api/v2/food').set('Authorization', `Bearer ${testUser.token}`).send({
      name: 'test2',
      calories: 3,
      type: 'fruit',
    });
    let response = await request.get('/api/v2/food').set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(200);
    expect(response.body[1].name).toEqual('test2');
    expect(response.body[1].calories).toEqual(3);
    expect(response.body[1].type).toEqual('fruit');
  });

  it('allows user with update access to update an item', async () => {
    let response = await request.put('/api/v2/food/1').set('Authorization', `Bearer ${testUser.token}`).send({
      name: 'update',
      calories: 2,
      type: 'protein',
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('update');
    expect(response.body.calories).toEqual(2);
    expect(response.body.type).toEqual('protein');

  });

  it('allows user with update access to delete an item', async () => {
    await request.delete('/api/v2/food/1').set('Authorization', `Bearer ${testUser.token}`);
    let response = await request.get('/api/v2/food/1').set('Authorization', `Bearer ${testUser.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(null);
  });
});