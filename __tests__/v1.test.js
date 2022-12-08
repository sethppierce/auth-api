'use strict';

const { db } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);



beforeAll( async () => {
  await db.sync();
});

afterAll( async () => {
  await db.drop();
});

describe('V1 CRUD', () => {
  it('creates a food object', async () => {
    let response = await request.post('/api/v1/food').send({
      name: 'V1test',
      calories: 2,
      type: 'fruit',
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual('V1test');
    expect(response.body.calories).toEqual(2);
    expect(response.body.type).toEqual('fruit');
  });
  it('gets one food object', async () => {
    let response = await request.get('/api/v1/food/1');

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('V1test');
    expect(response.body.calories).toEqual(2);
    expect(response.body.type).toEqual('fruit');
  });
  it('gets all food objects', async () => {
    let response2 = await request.post('/api/v1/food').send({
      name: 'V1test2',
      calories: 3,
      type: 'fruit',
    });
    let response = await request.get('/api/v1/food');

    expect(response.status).toBe(200);
    expect(response.body[1].name).toEqual('V1test2');
    expect(response.body[1].calories).toEqual(3);
    expect(response.body[1].type).toEqual('fruit');
  });

  it('updates food object', async () => {
    let response = await request.put('/api/v1/food/1').send({
      name: 'V1update',
      calories: 2,
      type: 'protein',
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('V1update');
    expect(response.body.calories).toEqual(2);
    expect(response.body.type).toEqual('protein');

  });

  it('deletes a food obj', async () => {
    await request.delete('/api/v1/food/1');
    let response = await request.get('/api/v1/food/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(null);
  });
});