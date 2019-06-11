import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import { MatSnackBar } from '@angular/material';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.scss']
})
export class AddTheatreComponent implements OnInit, OnDestroy {
  sub: Subscription;
  @ViewChild('place') placeEleRef: ElementRef;
  filterForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    place: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    geolocation: ['', Validators.required],
    seats: ['', Validators.required]
  });
  shows;

  payload;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.shows = [];
    this.mapsAPILoader.load().then(() => {

      const autocomplete = new google.maps.places.Autocomplete(this.placeEleRef.nativeElement);
      autocomplete.addListener('place_changed', (eve) => {
        this.ngZone.run(() => {
          const result = this.getFormattedAddress(autocomplete.getPlace());
          this.filterForm.get('address').setValue(result.formatted_address);
          this.filterForm.get('city').setValue(result.locality);
          this.filterForm.get('geolocation').setValue(`${result.latitude},${result.longitude}`);
        });
      });
    });
  }

  getFormattedAddress(place) {
    const location_obj: any = {};
    const address = place['address_components'];
    if (place.geometry) {
      location_obj['latitude'] = place.geometry.location.lat();
      location_obj['longitude'] = place.geometry.location.lng();
    }
    address.forEach(element => {
      location_obj.formatted_address = place.formatted_address;
      if (element['types'].indexOf('locality') > -1) {
        location_obj['locality'] = element['long_name'];
      } else if (element['types'].indexOf('administrative_area_level_1') > -1) {
        location_obj['admin_area_l1'] = element['short_name'];
      } else if (element['types'].indexOf('street_number') > -1) {
        location_obj['street_number'] = element['short_name'];
      } else if (element['types'].indexOf('route') > -1) {
        location_obj['route'] = element['long_name'];
      } else if (element['types'].indexOf('country') > -1) {
        location_obj['country'] = element['long_name'];
      } else if (element['types'].indexOf('postal_code') > -1) {
        location_obj['postal_code'] = element['short_name'];
      }
    });
    return location_obj;
  }

  addTheatre() {
    this.payload = {
      name: this.filterForm.get('name').value,
      geolocation: this.filterForm.get('geolocation').value,
      address: this.filterForm.get('address').value,
      seats: this.filterForm.get('seats').value,
      city: this.filterForm.get('city').value,
      shows: this.shows,
      movies: []
    };
    this.sub = this.dataService.createTheatre(this.payload).subscribe(
      success => {
        this.dataService.theatreListUpdate();
        this.snackBar.open('Theatre created successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.formReset();
      }, error => {
        this.snackBar.open('Theatre created failed!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
  }

  formReset() {
    this.filterForm.reset();
    this.shows = [];
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
