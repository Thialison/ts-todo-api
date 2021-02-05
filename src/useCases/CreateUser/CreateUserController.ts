import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase

  constructor(createuserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createuserUseCase
  }

  async handle(resquest: Request, response: Response): Promise<Response> {
    const { email, password } = resquest.body

    try {
      await this.createUserUseCase.execute({
        email,
        password
      })

      return response.status(201).send('User Created')
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
