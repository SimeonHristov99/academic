import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  showValidationErrors: boolean;

  constructor(
    private noteService: NoteService,
    private router: Router
  ) {
    this.showValidationErrors = false;
  }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      this.showValidationErrors = true
      return
    }

    this.showValidationErrors = false

    console.log('Add note here')
    // this.noteService.addNote(
    //   new Note(form.value.title, form.value.content)
    // )

    this.router.navigateByUrl('/user/notes')
  }

}
