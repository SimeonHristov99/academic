import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NotesComponent } from './notes/notes.component';
import { OrganizationComponent } from './organization/organization.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'organization', component: OrganizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
