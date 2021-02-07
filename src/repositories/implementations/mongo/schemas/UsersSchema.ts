import { Schema, model, Document } from 'mongoose'

export interface IUserModel extends Document {
  _id?: string,
  email: string,
  password: string,
  name?: string,
  age?: number
}

const UserSchema = new Schema({
  _id: String,
  email: String,
  password: String,
  name: String,
  age: Number
}, {
  timestamps: true
})

export default model<IUserModel>('User', UserSchema)
