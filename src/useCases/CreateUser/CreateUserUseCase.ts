import { User } from '../../entities/User'
import { IUserRepository } from '../../repositories/IUserRepository'
import { ICreateUserRequest } from './CreateUserDTO'

export class CreateUserUseCase {
  private usersRepository: IUserRepository

  constructor(repository: IUserRepository) {
    this.usersRepository = repository
  }

  async execute(data: ICreateUserRequest) {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new Error('User already exists')
    }

    const user = new User(data)
    await this.usersRepository.save(user)
  }
}
