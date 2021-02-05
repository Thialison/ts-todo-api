import { Router } from 'express'
import { createUserController } from './useCases/CreateUser'

const router = Router()

router.get('/', (request, response) => {
  response.send('Heloow Brow')
})

router.post('/users', (resquest, response) => {
  createUserController.handle(resquest, response)
})

export default router
