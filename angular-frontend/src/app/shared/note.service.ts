import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[]

  constructor() {
    this.notes = [
      new Note('Test title', 'Test content!'),
      new Note('Heyo!', 'Testing one, two, three!'),
    ]
  }

  getNotes() {
    return this.notes
  }

  getNote(id:string) {
    return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    this.notes.push(note)
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note, updatedFields)
  }

  deleteNote(id: string) {
    const noteIdx = this.notes.findIndex(n => n.id === id)
    
    if(noteIdx == -1) return
    
    this.notes.splice(noteIdx, 1)
  }
}
