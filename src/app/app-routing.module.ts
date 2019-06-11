import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';

import { UserModule } from './core/shell/user-layout/user.module';
import { UserComponent } from './core/shell/user-layout/user.component';

import { MoviesComponent } from './movies/container/movies/movies.component';

const routes: Routes = [
  {
      path: '' , redirectTo: 'users', pathMatch: 'full'
  },
  {
      path: 'users',
      component: UserComponent
  },
  {
      path: 'admin',
      loadChildren: './core/shell/admin-layout/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
