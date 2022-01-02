import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { CourseComponent } from './course/course.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'course', component: CourseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
