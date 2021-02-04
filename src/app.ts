import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors())
  }

  private database(): void {
    mongoose.connect('mongodb://localhost/todo-api-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
  }

  private routes(): void {
    this.app.get('/', (req, res) => {
      return res.send('Hello World')
    })
  }
}

export default new App().app
