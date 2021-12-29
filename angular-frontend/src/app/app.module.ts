import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NotesComponent } from './notes/notes.component';
import { BookmarkTileComponent } from './bookmark-tile/bookmark-tile.component';
import { FiltersTileComponent } from './filters-tile/filters-tile.component';
import { OrganizationComponent } from './organization/organization.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AddCourseComponent } from './add-course/add-course.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { CartComponent } from './cart/cart.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { SidebarInfoComponent } from './sidebar-info/sidebar-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BookmarksComponent,
    NotesComponent,
    BookmarkTileComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
