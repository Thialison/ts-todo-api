import { v4 } from 'uuid'

export class User {
  public readonly id?: string

  public email: string
  public password: string
  public name?: string
  public age?: number

  constructor(props: Omit<User, 'id'>, id?: string, name?: string, age?: number) {
    this.id = v4()

    this.email = props.email
    this.password = props.password
  }
}
