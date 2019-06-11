import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatRippleModule,
  MatAutocompleteModule,
  MatChipsModule
} from '@angular/material';
 import { MatMenuModule} from '@angular/material/menu';
 import { FlexLayoutModule } from '@angular/flex-layout';
 import {MatButtonToggleModule} from '@angular/material/button-toggle';
const materialModules = [
  MatMenuModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatSelectModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatRippleModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatChipsModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModules,
    FlexLayoutModule,
    MatButtonToggleModule
  ],
  exports: [materialModules, FlexLayoutModule],
})
export class MaterialModule { }
