import { Decimal128 } from 'mongoose';
import IUser from './IUser';

interface ICourse {
  _id: String,
  createdBy: String,
  title: String,
  description: String,
  price: Number,
  rating: Number,
  duration: Number,
  level: String,
  usersEnrolled?: Set<IUser>,
  createdAt?: Number, 
  content: { [week: string]: String },
}

export default ICourse;