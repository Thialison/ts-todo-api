import { User } from '@entities/User'

describe('User Entity', () => {
  const user = new User({ email: 'teste@gmail.com', password: 'teste' })

  it('should create new user', async () => {
    expect(user.email).toBe('teste@gmail.com')
    expect(user.password).toBe('teste')
    expect(typeof user.id).toBe('string')
  })
})
