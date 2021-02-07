
import mongoose from 'mongoose'
import log from '../utils/logger'

export const mongoConnection = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost/todo-api-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (err) {
    log.error('DB connect failed.')
    throw new Error(err.message)
  }
  mongoose.connection.on('error', err => {
    log.error(err)
  })
}

export const mongoCloseConnection = async (): Promise<void> => mongoose.connection.close()
