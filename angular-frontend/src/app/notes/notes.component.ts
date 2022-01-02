import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Greeting } from '../app.component';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  greeting: Greeting = {
    header: 'Hello, Jim',
    context: '19:00, 1 January 2022',
    inUser: true
  };

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  notes: Note[]

  constructor(private noteService: NoteService) {
     this.notes = []
  }

  ngOnInit(): void {
    this.headerData.emit(this.greeting);
    this.notes = this.noteService.getNotes()
  }

}
