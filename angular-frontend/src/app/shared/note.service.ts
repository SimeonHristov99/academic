import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from '../services/web-request.service';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[]

  constructor(private webService: WebRequestService) {
    this.notes = []
  }

  getNotes() {
    return this.webService.get('notes') as Observable<Note[]>
  }

  addNote(note: any) {
    return this.webService.post('note', {
      createdBy: localStorage.getItem('userId'),
      title: note.title,
      description: note.description
    })
  }

  updateNote(note: Note) {
    return this.webService.post('/note/update', note)
  }

  deleteNote(payload: {_id: string}) {
    return this.webService.post('note/delete',payload)
  }
}
