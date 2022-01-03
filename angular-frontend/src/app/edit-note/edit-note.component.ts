import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note: Note

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {
    this.note = {
      _id:'',
      title: 'NA',
      content: 'NA'
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')

      if (!idParam) {
        console.log('ERROR: Invalid note id ')
        console.log(idParam)
        return
      }

      this.noteService.getNotes().subscribe(res => {
        const note = res.find(n => n._id === idParam)

        if (!note) {
          console.log('ERROR: Invalid note ')
          console.log(note)
          return
        }

        this.note = note
      })
    })
  }

  onFormSubmit(form: NgForm) {
    console.log('Make call to updateNote here')
    // this.noteService.updateNote(this.note._id, form.value)
    this.router.navigateByUrl('/user/notes')
  }

  deleteNote() {
    this.noteService.deleteNote(this.note._id)
    this.router.navigateByUrl('/user/notes')
  }

}
