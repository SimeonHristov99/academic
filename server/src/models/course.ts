import { Schema, model, Types, Document, Model } from 'mongoose';
import { Decimal128 } from 'mongodb';
import ICourse from './interfaces/ICourse';

export interface CourseDocument extends ICourse, Document {
  _id: string
}

export interface CourseModel extends Model<CourseDocument> {

}

const courseSchema = new Schema<CourseDocument, CourseModel>({
  createdBy: {
    type: Types.ObjectId,
    requeired: true,
  },
  title: {
    type: String,
    requeired: true,
  },
  description: {
    type: String,
    requeired: true,
  },
  price: {
    type: Decimal128,
    required: true,
  },
  rating: {
    type: Decimal128,
    required: false,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
  },
  usersEnrolled: [{ type: Types.ObjectId, ref: 'User' }],
},
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export const Course = model<CourseDocument>('Course', courseSchema);