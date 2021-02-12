import { Request, Response, Router } from 'express'
import { createUserController } from '../useCases/CreateUser'
import { check, validationResult } from 'express-validator'

const userRouter = Router()

userRouter.get('/', (request, response) => {
  response.status(200)
    .json({ message: 'Hello Im Up' }).send()
})

userRouter.post('/users', [
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 }).trim().escape()
], (resquest: Request, response: Response) => {
  const errors = validationResult(resquest)
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() })
  }
  createUserController.handle(resquest, response)
})

export default userRouter
