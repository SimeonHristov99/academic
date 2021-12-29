import { Decimal128 } from 'mongodb';
import { Schema, model, Types, Document, Model } from 'mongoose';
import IComment from './interfaces/IComment';

export interface CommentDocument extends IComment, Document {
  _id: string
}

export interface CommentModel extends Model<CommentDocument> {

}

const commentSchema = new Schema<CommentDocument, CommentModel>({
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
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export const Comment = model<CommentDocument>('Comment', commentSchema);