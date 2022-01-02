import { Schema, model, Types, Document, Model } from 'mongoose';
import INote from './interfaces/INote';

export interface NoteDocument extends INote, Document {
  _id: string
}

export interface NoteModel extends Model<NoteDocument> {

}

const NoteSchema = new Schema<NoteDocument, NoteModel>({
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

export const Note = model<NoteDocument>('Note', NoteSchema);