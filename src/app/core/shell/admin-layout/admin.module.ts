import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminService} from './admin.service';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminViewModule  } from '../../../admin-view/admin-view.module';
import { AdminSideNavComponent } from './admin-side-nav/admin-side-nav.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AdminComponent, AdminHeaderComponent, AdminSideNavComponent],
  imports: [
    AdminViewModule,
    RouterModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCBPoSCCOPZWrYgu7cS3ivZUxRvtq2y53g',
      libraries: ['places']
    })
  ],
   providers: [AdminService]
})
export class AdminModule { }
