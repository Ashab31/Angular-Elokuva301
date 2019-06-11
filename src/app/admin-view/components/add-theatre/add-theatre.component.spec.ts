import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import { MatSnackBar } from '@angular/material';
import { MapsAPILoader } from '@agm/core';
import { AddTheatreComponent } from './add-theatre.component';
describe('AddTheatreComponent', () => {
  let component: AddTheatreComponent;
  let fixture: ComponentFixture<AddTheatreComponent>;
  beforeEach(() => {
    const ngZoneStub = { run: () => ({}) };
    const formBuilderStub = {};
    const dataServiceStub = {
      createTheatre: () => ({ subscribe: () => ({}) }),
      theatreListUpdate: () => ({})
    };
    const matSnackBarStub = { open: () => ({}) };
    const mapsAPILoaderStub = { load: () => ({ then: () => ({}) }) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddTheatreComponent],
      providers: [
        { provide: NgZone, useValue: ngZoneStub },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: DataService, useValue: dataServiceStub },
        { provide: MapsAPILoader, useValue: mapsAPILoaderStub }
      ]
    });
    fixture = TestBed.createComponent(AddTheatreComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const ngZoneStub: NgZone = fixture.debugElement.injector.get(NgZone);
      const mapsAPILoaderStub: MapsAPILoader = fixture.debugElement.injector.get(
        MapsAPILoader
      );
      spyOn(component, 'getFormattedAddress');
      spyOn(ngZoneStub, 'run');
      spyOn(mapsAPILoaderStub, 'load');
      component.ngOnInit();
      expect(component.getFormattedAddress).toHaveBeenCalled();
      expect(ngZoneStub.run).toHaveBeenCalled();
      expect(mapsAPILoaderStub.load).toHaveBeenCalled();
    });
  });
  describe('addTheatre', () => {
    it('makes expected calls', () => {
      const dataServiceStub: DataService = fixture.debugElement.injector.get(
        DataService
      );
      const matSnackBarStub: MatSnackBar = fixture.debugElement.injector.get(
        MatSnackBar
      );
      spyOn(component, 'formReset');
      spyOn(dataServiceStub, 'createTheatre');
      spyOn(dataServiceStub, 'theatreListUpdate');
      spyOn(matSnackBarStub, 'open');
      component.addTheatre();
      expect(component.formReset).toHaveBeenCalled();
      expect(dataServiceStub.createTheatre).toHaveBeenCalled();
      expect(dataServiceStub.theatreListUpdate).toHaveBeenCalled();
      expect(matSnackBarStub.open).toHaveBeenCalled();
    });
  });
});
