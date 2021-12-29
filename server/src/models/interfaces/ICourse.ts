import { Decimal128 } from 'mongoose';
import IUser from './IUser';

interface ICourse {
  _id: String,
  createdBy: String,
  title: String,
  description: String,
  price: Decimal128,
  rating: Decimal128,
  duration: Number,
  usersEnrolled?: Set<IUser>,
  createdAt?: Number,
}

export default ICourse;