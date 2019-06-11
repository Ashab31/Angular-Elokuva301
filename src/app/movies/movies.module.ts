import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MoviesService } from './movies.service';
import { moviesReducer } from './store/movies-reducers/reducers';
import {MoviesRoutingModule} from './movies-routing.module';
import { NowShowingComponent } from './container/now-showing/now-showing.component';
import { UpcomingComponent } from './container/upcoming/upcoming.component';
import { MoviesComponent } from './container/movies/movies.component';
import { DetailComponent } from './components/detail/detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MaterialModule } from '../core/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { BookingComponent } from '../shared/components/booking/booking.component';
import { UnauthorizedUserComponent } from '../shared/components/unauthorized-user/unauthorized-user.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ProfileComponent } from './components/profile/profile.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';

@NgModule({
  declarations: [
    NowShowingComponent,
    UpcomingComponent,
    MoviesComponent,
    DetailComponent,
    MovieListComponent,
    ProfileComponent,
    UserHistoryComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Ng2CarouselamosModule,
    StoreModule.forFeature('Movies', moviesReducer),
    MoviesRoutingModule,
    SharedModule,
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCBPoSCCOPZWrYgu7cS3ivZUxRvtq2y53g'
    })
  ],
  providers: [
    MoviesService
  ],
  exports: [
    MoviesComponent,
    DetailComponent,
    MovieListComponent,
    ProfileComponent,
    MaterialModule
    ],
    entryComponents: [
      NowShowingComponent,
      UpcomingComponent,
      BookingComponent,
      UnauthorizedUserComponent
    ]
})
export class MoviesModule { }
