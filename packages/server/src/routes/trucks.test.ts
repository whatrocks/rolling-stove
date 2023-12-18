import request from 'supertest'
import app from '../app'
import { describe, it, expect } from '@jest/globals'

describe('GET /trucks', () => {
  it('responds with 400 if missing query params', async () => {
    const response = await request(app).get('/api/trucks')
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ error: 'Missing required query parameters' })
  })

  it('responds with up to three nearby trucks', async () => {
    const response = await request(app).get('/api/trucks?lat=37.7&lon=-122.4&time=10:00&dayOfWeek=2')
    expect(response.statusCode).toBe(200)
    expect(response.body.data.length).toEqual(3)
  })
})
