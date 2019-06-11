import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './container/movies/movies.component';
import { UserService } from './../core/shell/user-layout/user.service';
import { DetailComponent } from './components/detail/detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import {UserHistoryComponent} from './components/user-history/user-history.component';
const routes: Routes = [
  UserService.childRoutes([
    { path: '', redirectTo: 'users/movies', pathMatch: 'full' },
    {
      path: 'users/movies', component: MoviesComponent
    },
    {
      path: 'users/detail', component: DetailComponent
    },
    {
      path: 'users/profile', component: ProfileComponent
    },
    {
      path: 'users/history', component: UserHistoryComponent
    }
  ])
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MoviesRoutingModule { }
