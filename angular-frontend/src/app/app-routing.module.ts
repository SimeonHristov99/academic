import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { CartComponent } from './cart/cart.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { NotesComponent } from './notes/notes.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'organization/add-course', component: AddCourseComponent },
  { path: 'welcome', component: InitialPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
