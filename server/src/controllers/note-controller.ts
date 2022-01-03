import { Request, Response } from 'express';
import { Note, NoteDocument } from '../models/note';
import INote from '../models/interfaces/INote';

export default class NoteController {
  construct() { }

  listNotes = async (req: Request, res: Response) => {
    const notes = await Note.aggregate([
    {
      $unset: "__v"
    }
    ]);

    console.log(notes)
    res.status(200).json(notes);
  }

  createNote = async (req: Request, res: Response) => {
    let note = req.body;

    await new Note(note).save((err: Error, course) => {
      if (err) {
        return res.status(500).json({ success: false, err });
      } else {
        res.status(200).json({ success: true });
      }
    })
  };

  updateNote = async (req: Request, res: Response) => {
    const note: INote = req.body;

    Note.findOneAndUpdate({ _id: note._id }, note, { new: true }, function (err, data) {
      if (err) {
        return res.status(500);
      } else {
        return res.status(200).send(data);
      }
    });

  };

  deleteNote = async (req: Request, res: Response, next: () => void) => {
    const note_id = req.body._id;

    try {
      const note = await Note.findOne({ _id: note_id }).exec();

      if (note) {
        note.remove((err: Error, _) => {
          if (err) {
            console.log(err);
            res.status(401).json({ success: false, error: err });
          }
          res.status(200).json({ success: true });
        });
      } else {
        res.status(401).json({ success: false, error: 'Invalid note id' });
      }
    } catch (error) {
      res.status(401).json({ success: false, error: 'Invalid note id' });
    }
  };
}