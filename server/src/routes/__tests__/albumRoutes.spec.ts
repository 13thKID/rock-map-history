import express from 'express'
import { CONNECTION_URL } from '../../config/db.config'
import mongoose from 'mongoose'
import app from '../../index'
import { describe, expect, test, beforeAll, afterAll, it } from '@jest/globals'
import request from 'supertest'

beforeAll(async () => {
  await mongoose.connect(CONNECTION_URL)
})

describe('GET /albums', () => {
  it('should return all albums', async () => {
    const res = await request(app).get('/albums')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

describe('POST /albums', () => {
  it('Should return id', async () => {
    const res = await request(app).post('/albums')
    expect(res.statusCode).toBe(200)
    expect(typeof res.body).toBeInstanceOf('string')
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})
