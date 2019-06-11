import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { FilterComponent } from './filter.component';
import { MaterialModule } from 'src/app/core/material/material.module';
describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  beforeEach(() => {
     const formBuilderStub: FormBuilder = new FormBuilder();
    const newTheater = formBuilderStub.group({
     test : 'test1'
    });
    const dataServiceStub = { languagesList: {}, genresList: {} };
    TestBed.configureTestingModule({
       imports : [MaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilterComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: DataService, useValue: dataServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('languageGroups defaults to: []', () => {
    expect(component.languageGroups).toEqual([]);
  });
  it('genreGroup defaults to: []', () => {
    expect(component.genreGroup).toEqual([]);
  });
  it('distanceGroup defaults to: []', () => {
    expect(component.distanceGroup).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'filterName');
      component.ngOnInit();
      // expect(component.filterName).toHaveBeenCalled();
    });
     it('getTheatresID', () => {
       const opt = 'tamil';
       const value = 'tamil';
    component.filterName(opt, value );
  });
  });
});
