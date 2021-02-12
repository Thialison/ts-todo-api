import { User } from '@entities/User'
import mongoose from 'mongoose'
import request from 'supertest'
import App from '../../app'

describe('Create User Endpoint', () => {
  const app = new App()

  const conn = mongoose.createConnection('mongodb://localhost/todo-api-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const user = new User({
    email: 'teste@gmail.com',
    password: 'teste'
  })

  beforeAll(async () => {
    await app.init()
    await conn.dropDatabase()
  })

  afterAll(async () => {
    await app.databaseClose()
    await conn.close()
  })

  it('Should return status code 200 and a "message" (route: GET /)', async (done) => {
    const res = await request(app.server).get('/')
    expect(res.status).toEqual(200)
    expect(res.body.message).toBe('Hello Im Up')

    done()
  })

  it('Should create new user (route: POST /users)', async (done) => {
    const res = await request(app.server)
      .post('/users')
      .send({ email: 'john@test.com.br', password: 'anewpassword2' })

    expect(res.status).toEqual(201)
    expect(res.body).toStrictEqual({ sucess: 'User Created' })

    done()
  })

  it('Should throw error when body is sent with wrong values (route: POST /users)', async (done) => {
    const res = await request(app.server)
      .post('/users')
      .send({ email: 'fsdafas', password: 'fsa' })

    expect(res.status).toEqual(422)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors[0].msg).toBe('Invalid value')
    expect(res.body.errors[1].msg).toBe('Invalid value')

    done()
  })

  it('Should throw error when User already exists (route: POST /users)', async (done) => {
    await conn.collection('users')
      .insertOne(user)

    const res = await request(app.server)
      .post('/users')
      .send({ email: 'teste@gmail.com', password: 'password' })

    expect(res.status).toEqual(400)
    expect(res.body).toStrictEqual({ message: 'User already exists' })

    done()
  })
})
