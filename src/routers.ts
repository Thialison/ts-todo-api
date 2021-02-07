import { Request, Response, Router } from 'express'
import { createUserController } from './useCases/CreateUser'
import { check, validationResult } from 'express-validator'

const router = Router()

router.get('/', (request, response) => {
  response.send('Heloow Brow')
})

router.post('/users', [
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 }).trim().escape()
], (resquest: Request, response: Response) => {
  const errors = validationResult(resquest)
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() })
  }
  createUserController.handle(resquest, response)
})

export default router
