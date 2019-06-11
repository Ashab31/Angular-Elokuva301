import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './user.service';
import {UserComponent} from './user.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { MoviesModule } from '../../../movies/movies.module';
import { CourseDialogComponentComponent } from './course-dialog-component/course-dialog-component.component';
import {SearchComponent} from '../../../shared/components/search/search.component';
@NgModule({
  declarations: [HeaderComponent, UserComponent, CourseDialogComponentComponent],
  imports: [
    CommonModule,
    RouterModule,
    MoviesModule
  ],
   providers: [UserService],
   exports : [],
   bootstrap: [],
   entryComponents: [CourseDialogComponentComponent, SearchComponent],
})
export class UserModule { }
