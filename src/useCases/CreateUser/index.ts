import { MongoUserRepository } from '../../repositories/implementations/mongo/MongoUsersRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const mongoUsersRepository = new MongoUserRepository()

const createUserUseCase = new CreateUserUseCase(
  mongoUsersRepository
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserUseCase, createUserController }
