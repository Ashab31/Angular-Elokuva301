import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AddTheatreComponent } from './components/add-theatre/add-theatre.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TheatreManagemnentComponent } from './components/theatre-managemnent/theatre-managemnent.component';
import { MoviesManagementComponent } from './components/movies-management/movies-management.component';
import { AddShowsComponent } from './components/add-shows/add-shows.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';

@NgModule({
  declarations: [
    AddTheatreComponent,
    TheatreManagemnentComponent,
    MoviesManagementComponent,
    AddShowsComponent,
    DasboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule
  ],
  entryComponents: [MoviesManagementComponent]
})
export class AdminViewModule { }
