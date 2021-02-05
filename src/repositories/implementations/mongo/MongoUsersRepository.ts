import { User } from '../../../entities/User'
import UserModel from './schemas/UsersSchema'
import { IUserRepository } from '../../IUserRepository'

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<any> {
    return await UserModel.findOne({ email })
  }

  async save(user: User): Promise<void> {
    const userModel = new UserModel()

    userModel._id = user.id
    userModel.email = user.email
    userModel.password = user.password
    userModel.name = user.name
    userModel.age = user.age

    await userModel.save()
  }
}
