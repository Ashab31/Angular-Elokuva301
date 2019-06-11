import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminService } from './../core/shell/admin-layout/admin.service';
import { AddTheatreComponent } from './components/add-theatre/add-theatre.component';
import { TheatreManagemnentComponent } from './components/theatre-managemnent/theatre-managemnent.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
const routes: Routes = [
  AdminService.childRoutes([
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'addTheatre', component: AddTheatreComponent
    },
    {
      path: 'theatreManagement', component: TheatreManagemnentComponent
    },
    {
      path: 'dashboard', component: DasboardComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
