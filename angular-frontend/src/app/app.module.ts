import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';
import { BookmarkTileComponent } from './bookmark-tile/bookmark-tile.component';
import { FiltersTileComponent } from './filters-tile/filters-tile.component';
import { OrganizationComponent } from './organization/organization.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AddCourseComponent } from './add-course/add-course.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BookmarksComponent,
    NotesComponent,
    TodosComponent,
    BookmarkTileComponent,
    FiltersTileComponent,
    OrganizationComponent,
    AddCourseComponent,
    InitialPageComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
