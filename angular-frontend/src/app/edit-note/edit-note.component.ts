import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, OnDestroy {

  note: Note
  subscriptions: Subscription[]

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {
    this.note = {
      _id: '',
      title: 'NA',
      description: 'NA'
    }
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        const idParam = paramMap.get('id')

        if (!idParam) {
          console.log('ERROR: Invalid note id ')
          console.log(idParam)
          return
        }

        this.subscriptions.push(
          this.noteService.getNotes().subscribe(res => {
            const note = res.find(n => n._id === idParam)

            if (!note) {
              console.log('ERROR: Invalid note ')
              console.log(note)
              return
            }

            this.note = note
          })
        )
      })
    )
  }

  ngOnDestroy(): void {
      this.subscriptions.map(s => s.unsubscribe())
  }

  onFormSubmit(form: NgForm) {
    const payload: Note = {
      _id: this.note._id,
      title: form.value.title,
      description: form.value.content,
    }

    this.subscriptions.push(
      this.noteService.updateNote(payload).subscribe(res => {
        this.router.navigateByUrl('/user/notes')
      })
    )
  }

  deleteNote() {
    const payload = {
      _id: this.note._id
    }

    this.subscriptions.push(
      this.noteService.deleteNote(payload).subscribe(_ => {
        this.router.navigateByUrl('/user/notes')
      })
    )
  }

}
