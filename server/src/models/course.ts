import { Schema, model, Types, Document, Model } from 'mongoose';
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
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'user',
    required: true,
  },
  usersEnrolled: [{ type: Types.ObjectId, ref: 'User' }],  
  content: [{
    week: {type: String},
    link: {type: String}
  }],
},
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export const Course = model<CourseDocument>('Course', courseSchema);