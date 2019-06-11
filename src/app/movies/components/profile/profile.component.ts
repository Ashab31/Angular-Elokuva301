import { Component, ElementRef, ViewChild, Inject, NgZone, OnDestroy , AfterViewInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';
import { DataService } from '../../../shared/services/data.service';
import { AuthenticationService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements  AfterViewInit, OnDestroy {
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  langCtrl = new FormControl();
  filteredLanguages: Observable<string[]>;
  languages: any = [];
  allLanguages: any = [];
  genreCtrl = new FormControl();
  filteredGenres: Observable<string[]>;
  genres: any = [];
  allgenres: any = [];
  theatreCtrl = new FormControl();
  filteredTheatres: Observable<string[]>;
  theatres: any = [];
  allTheatres: any = [];
  users;
  sub: Subscription;

  @ViewChild('langInput') langInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoLang') langMatAutocomplete: MatAutocomplete;
  @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoGenre') genreMatAutocomplete: MatAutocomplete;
  @ViewChild('theatreInput') theatreInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoTheatre') theatreMatAutocomplete: MatAutocomplete;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private auth: AuthenticationService,
  ) {
    this.langCtrl.valueChanges.subscribe(value => {
      let val;
      if (_.isObject(value)) {
        val = value['english_name'];
      } else {
        val = value;
      }
      this.filteredLanguages = value ? this._filter(val, this.allLanguages, 'english_name') : this.allLanguages.slice();
    });

    this.genreCtrl.valueChanges.subscribe(value => {
      let val;
      if (_.isObject(value)) {
        val = value['name'];
      } else {
        val = value;
      }
      this.filteredGenres = value ? this._filter(val, this.allgenres, 'name') : this.allgenres.slice();
    });

    this.theatreCtrl.valueChanges.subscribe(value => {
      let val;
      if (_.isObject(value)) {
        val = value['name'];
      } else {
        val = value;
      }
      this.filteredTheatres = value ? this._filter(val, this.allTheatres, 'name') : this.allTheatres.slice();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.users = localStorage.getItem('currentUser');
      if (this.users) {
        this.users = JSON.parse(this.users);
      }
      this.getMasterData();
    }, 500);
  }

  getMasterData() {
    this.allLanguages = this.dataService.languagesList;
    this.allgenres = this.dataService.genresList;
    this.allTheatres = this.dataService.theatresList;
    this.getDefaultData();
  }

  getDefaultData() {
    const pref = this.users.preferences;
    if (pref) {
      this.languages = _.filter(this.allLanguages, obj => pref.lang && pref.lang.indexOf(obj['iso_639_1']) > -1);
      this.genres = _.filter(this.allgenres, obj => pref.genres && pref.genres.indexOf(obj['id']) > -1);
      this.theatres = _.filter(this.allTheatres, obj => pref.theatres && pref.theatres.indexOf(obj['id']) > -1);
    }
  }

  onClickSave(key) {
    let preferences = this.users.preferences;
    if (!preferences) {
      preferences = {};
    }
    switch (key) {
      case 'languages':
        preferences.lang = _.map(this.languages, 'iso_639_1');
        break;
      case 'genres':
        preferences.genres = _.map(this.genres, (obj: any) => Number(obj.id));
        break;
      case 'theatres':
        preferences.theatres = _.map(this.theatres, (obj: any) => Number(obj.id));
        break;
    }
    this.savePreferences(preferences);
  }

  onClickSaveAll() {
    const preferences = {
      lang: _.map(this.languages, 'iso_639_1'),
      genres: _.map(this.genres, (obj: any) => Number(obj.id)),
      theatres: _.map(this.theatres, (obj: any) => Number(obj.id))
    };
    this.savePreferences(preferences);
  }

  savePreferences(preferences) {
    this.users.preferences = preferences;
    this.sub = this.dataService.updateUser(this.users, this.users.id).subscribe(
      success => {
        this.auth.setUserDetails(this.users);
        this.snackBar.open('Preferences configured successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.ngAfterViewInit();
      },
      error => {
        this.snackBar.open('Preferences configured failed!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
  }

  remove(index, array): void {
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, array, control, input): void {
    if (_.findIndex(array, event.option.value) === -1) {
      array.push(event.option.value);
      input.value = '';
      control.setValue(null);
    }
  }

  private _filter(value: any, array, field): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(obj => obj[field].toLowerCase().indexOf(filterValue) === 0);
  }
  trackByFn(index, item) {
    return index;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();  }
}
