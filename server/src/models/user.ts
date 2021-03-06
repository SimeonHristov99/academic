import { Schema, model, Model, Document } from 'mongoose';
import IUser from './interfaces/IUser';

export interface UserDocument extends IUser, Document {
  _id: String
}

export interface UserModel extends Model<UserDocument, UserModel> {

}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    requeired: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'organisation'],
    default: 'user',
    required: true,
  },
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  courses: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    mark: Number,
    url: String,
  }],
},
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

export const User = model<UserDocument>('User', userSchema);