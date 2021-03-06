import IComment from './INote';
import ICourse from './ICourse';

interface IUser {
  _id: String,
  email: String,
  firstname: String,
  lastname: String,
  password: String,
  birthDate: Date,
  role: String,
  comment?: Set<IComment>,
  courses?: [{
    courseId: ICourse,
    mark: Number,
    url: String,
  }],
  createdAt?: Number,
}

export default IUser;