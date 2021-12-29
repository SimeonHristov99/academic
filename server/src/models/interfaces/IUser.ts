import ICourse from './ICourse';

interface IUser {
  _id: String,
  email: String,
  firstname: String,
  lastname: String,
  password: String,
  birthDate: Date,
  courses?: Set<ICourse>,
  certificates?: Set<ICourse>,
  createdAt?: Number,
}

export default IUser;