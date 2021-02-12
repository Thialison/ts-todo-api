import { User } from '@entities/User'
import UserModel, { IUserModel } from '@schemas/UsersSchema'
import { IUserRepository } from '@repositories/IUserRepository'

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUserModel | null> {
    return await UserModel.findOne({ email })
  }

  async save(user: User): Promise<void> {
    const { id, email, password, name, age } = user

    const userModel = new UserModel({
      _id: id,
      email,
      password,
      name,
      age
    })

    await userModel.save()
  }
}
