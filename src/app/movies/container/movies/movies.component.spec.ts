import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { MoviesComponent } from './movies.component';
describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  beforeEach(() => {
    const componentFactoryResolverStub = {
      resolveComponentFactory: () => ({})
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MoviesComponent],
      providers: [
        {
          provide: ComponentFactoryResolver,
          useValue: componentFactoryResolverStub
        }
      ]
    });
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'loadComponent');
      component.ngOnInit();
      expect(component.loadComponent).toHaveBeenCalled();
    });
  });
});
