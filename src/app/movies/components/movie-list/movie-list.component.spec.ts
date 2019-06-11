import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MovieListComponent } from './movie-list.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { environment } from './../../../../environments/environment';
describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  beforeEach(() => {
    const matDialogStub = { open: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports : [MaterialModule],
      declarations: [MovieListComponent],
      providers: [{ provide: MatDialog, useValue: matDialogStub }]
    });
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('MOVIE_IMAGE_URL defaults to: environment.movies.MOVIE_IMAGE_URL', () => {
    expect(component.MOVIE_IMAGE_URL).toEqual(
      environment.movies.MOVIE_IMAGE_URL
    );
  });
  it('halfStar defaults to: 0', () => {
    expect(component.halfStar).toEqual(0);
  });
  it('fullStar defaults to: []', () => {
    expect(component.fullStar).toEqual([]);
  });
  it('emptyStar defaults to: []', () => {
    expect(component.emptyStar).toEqual([]);
  });
  // describe('openBooking', () => {
  //   it('makes expected calls', () => {
  //     const detail = {
  //       title: 'test'
  //     };
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(matDialogStub, 'open');
  //     component.openBooking();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });
});
