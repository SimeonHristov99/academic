import { Router } from 'express';
import NoteController from '../controllers/note-controller';
import authorization from '../middleware/authorization';
import roleValidator from '../middleware/role-validator';

const note = Router();
const noteController: NoteController = new NoteController();

note.get('/notes', noteController.listNotes);

note.post('/note',
  authorization,
  roleValidator(['organisation', 'admin']),
  noteController.createNote);

  note.post('/note/delete',
  authorization,
  roleValidator(['organisation', 'admin']),
  noteController.deleteNote);

  note.post('/note/update',
  authorization,
  roleValidator(['organisation', 'admin']),
  noteController.updateNote);

export default note;