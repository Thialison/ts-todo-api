import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { makeEncrypt } from '../../utils/encrypt'

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase

  constructor(createuserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createuserUseCase
  }

  async handle(resquest: Request, response: Response): Promise<Response> {
    let { email, password } = resquest.body

    password = await makeEncrypt(password)

    try {
      await this.createUserUseCase.execute({
        email,
        password
      })
      return response.status(201).json({ sucess: 'User Created' })
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
