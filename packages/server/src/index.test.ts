import request from 'supertest';
import app from './app';
import { describe, it, expect } from '@jest/globals';

describe('GET /ping', () => {
  it('responds with json', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World!' });
  });
});