import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';
import { CourseTileComponent } from './course-tile/course-tile.component';
import { FiltersTileComponent } from './filters-tile/filters-tile.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { CartComponent } from './cart/cart.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { SidebarInfoComponent } from './sidebar-info/sidebar-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import {HttpClientModule} from '@angular/common/http';
import { SeeCourseComponent } from './components/see-course/see-course.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    CoursesComponent,
    NotesComponent,
    CourseTileComponent,
    FiltersTileComponent,
    OrganizationComponent,
    AddCourseComponent,
    InitialPageComponent,
    CartComponent,
    AddNoteComponent,
    NoteCardComponent,
    AddUserComponent,
    EditNoteComponent,
    CartItemComponent,
    SidebarInfoComponent,
    AdminComponent,
    StudentDetailsComponent,
    SeeCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
