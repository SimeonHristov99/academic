import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit, OnDestroy {

  showValidationErrors: boolean
  subscriptions: Subscription[]

  constructor(
    private noteService: NoteService,
    private router: Router
  ) {
    this.showValidationErrors = false
    this.subscriptions = []
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      this.showValidationErrors = true
      return
    }

    this.showValidationErrors = false

    const payload = {
      title: form.value.title,
      description: form.value.content,
    }

    this.subscriptions.push(this.noteService.addNote(payload).subscribe(res => {
      this.router.navigateByUrl('/user/notes')
    }))
  }

}
