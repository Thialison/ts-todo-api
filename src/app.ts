import express from 'express'
import cors from 'cors'
import { mongoConnection } from './services/mongo'
import routers from './routers'

class App {
  public server: express.Application

  constructor() {
    this.server = express()
  }

  public async init(): Promise<void> {
    await this.databaseSetup()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.server.use(express.json())
    this.server.use(cors())
  }

  public async databaseSetup(): Promise<void> {
    await mongoConnection()
  }

  private routes(): void {
    this.server.use(routers)
  }
}

export default new App()
