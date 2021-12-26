import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { NotesComponent } from './notes/notes.component';
import { OrganizationComponent } from './organization/organization.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'organization/add-course', component: AddCourseComponent },
  { path: 'welcome', component: InitialPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
