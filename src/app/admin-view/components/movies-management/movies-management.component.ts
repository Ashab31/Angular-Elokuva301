import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit, Inject, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Promise, all } from 'q';
import { DataService } from '../../../shared/services/data.service';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-movies-management',
  templateUrl: './movies-management.component.html',
  styleUrls: ['./movies-management.component.scss']
})
export class MoviesManagementComponent implements OnInit {
  moviesList;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: any = [];
  allFruits: any = [];
  isLoading;
  shows;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<MoviesManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public theatreData: any,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {

    this.fruitCtrl.valueChanges.subscribe(value => {
      if (_.isString(value)) {
        if (value) {
          this.dataService.searchMovies(value, 1).subscribe(success => {
            this.allFruits = success['results'];
            this.filteredFruits =  value ? this._filter(value) : this.allFruits.slice();
          });
        } else {
          this.filteredFruits =  value ? this._filter(value) : this.allFruits.slice();
        }
      }
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.shows = this.theatreData.shows;
    this.getMoviesDetails();
  }

  getMoviesDetails() {
    const data = Promise((resolve, reject) => {
      const moviesList: any = [];
      if (this.theatreData.movies && this.theatreData.movies.length) {
        this.theatreData.movies.forEach((element, index) => {
          this.dataService.getMovieDetails(element).subscribe(
            success => {
              moviesList.push(success);
              if ((this.theatreData.movies.length - 1) === index) {
                resolve(moviesList);
              }
            }, error => {
              if ((this.theatreData.movies.length - 1) === index) {
                resolve(moviesList);
              }
            }
          );
        });
      } else {
        resolve(moviesList);
      }
    });

    data.then(success => {
      this.isLoading = false;
      this.zone.run(() => {
        this.fruits = success;
      });
    });
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value: any = event.value;
      // Add our fruit
      if (value) {
        this.fruits.push(value);
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.fruitCtrl.setValue(null);
    }
  }

  remove(index): void {
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  save(type) {
    this.theatreData.movies = _.map(this.fruits, 'id');
    this.theatreData.shows = this.shows;
    this.dataService.updateTheatre(this.theatreData.id, this.theatreData).subscribe(
      success => {
        this.dialogRef.close();
        this.snackBar.open(type + ' updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }, error => {
        this.snackBar.open(type + ' updated failed!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.title.toLowerCase().indexOf(filterValue) === 0);
  }
  trackByFn(index, item) {
    return index;
  }
}
