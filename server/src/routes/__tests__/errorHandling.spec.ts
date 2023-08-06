import express from 'express'
import { CONNECTION_URL } from '../../config/db.config'
import mongoose from 'mongoose'
import app from '../../index'
import { describe, expect, test, beforeAll, afterAll, it } from '@jest/globals'
import request from 'supertest'
import { ReqErr } from '../../classes/RequestError'
import { exec } from 'child_process'

beforeAll(async () => {
  await mongoose.connect(CONNECTION_URL)
})

describe('GET /<ranodm>', () => {
  it('should return "unknown-route" error', async () => {
    const res = await request(app).get('/random')
    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual(new ReqErr('unknown-route'))
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})
