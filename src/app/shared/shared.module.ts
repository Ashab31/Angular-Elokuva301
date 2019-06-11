import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './components/booking/booking.component';
import { SearchComponent } from './components/search/search.component';
import { DataService } from './services/data.service';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { MoviesFilterPipe } from './pipes/movies-filter.pipe';
import { IsoLanguagePipe } from './pipes/iso-language.pipe';
import { TheatresSortOrderPipe } from './pipes/theatres-sort-order.pipe';
import { UnauthorizedUserComponent } from './components/unauthorized-user/unauthorized-user.component';

@NgModule({
  declarations: [
    BookingComponent,
    SearchComponent,
    FilterComponent,
    MoviesFilterPipe,
    IsoLanguagePipe,
    TheatresSortOrderPipe,
    UnauthorizedUserComponent
],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers : [],
  exports: [
    BookingComponent,
    SearchComponent,
    FilterComponent,
    MoviesFilterPipe,
    TheatresSortOrderPipe
  ]
})
export class SharedModule { }
