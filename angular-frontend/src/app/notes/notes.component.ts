import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Greeting } from '../app.component';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  greeting: Greeting
  date: Date = new Date()
  subscriptions: Subscription[]

  @Output() headerData: EventEmitter<Greeting> = new EventEmitter();

  notes: Note[]

  constructor(private noteService: NoteService) {
    this.greeting = {
      header: `Hello, ${localStorage.getItem('firstName')}`,
      context: '' + this.date,
      inUser: true
    }
    this.notes = []
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.headerData.emit(this.greeting)

    this.subscriptions.push(
      this.noteService.getNotes().subscribe(res => {
        console.log(res)
        this.notes = res

      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }
}
