import express from 'express'
import cors from 'cors'
import { mongoConnection, mongoCloseConnection } from './services/mongo'
import userRouter from '@routes/userRoutes'

class App {
  public server: express.Application

  constructor() {
    this.server = express()
  }

  async init(): Promise<void> {
    await this.databaseSetup()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.server.use(express.json())
    this.server.use(cors())
  }

  async databaseSetup(): Promise<void> {
    await mongoConnection()
  }

  async databaseClose(): Promise<void> {
    await mongoCloseConnection()
  }

  private routes(): void {
    this.server.use(userRouter)
  }
}

export default App
