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
  usersEnrolled?: Set<IUser>,
  createdAt?: Number,
}

export default ICourse;