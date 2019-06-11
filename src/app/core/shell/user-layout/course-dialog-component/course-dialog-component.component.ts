import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MoviesService } from '../../../../movies/movies.service';
import { appConstants } from '../../../../config/constants';

@Component({
  selector: 'app-course-dialog-component',
  templateUrl: './course-dialog-component.component.html',
  styleUrls: ['./course-dialog-component.component.scss']
})
export class CourseDialogComponentComponent implements OnInit {
  cityList = appConstants.cityList;
  selectedItem: string;
  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponentComponent>,
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.selectedItem = appConstants.defaultCity;
  }

  selectedCity(event, newValue) {
    this.selectedItem = newValue;
    localStorage.setItem('city', this.selectedItem);
    this.moviesService.getTheatresList(this.selectedItem);
    this.dialogRef.close();
  }
}
