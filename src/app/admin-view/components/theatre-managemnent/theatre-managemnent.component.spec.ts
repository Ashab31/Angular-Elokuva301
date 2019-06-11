import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TheatreManagemnentComponent } from './theatre-managemnent.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../../shared/services/data.service';

describe('TheatreManagemnentComponent', () => {
  let component: TheatreManagemnentComponent;
  let fixture: ComponentFixture<TheatreManagemnentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatreManagemnentComponent ],
      imports : [MaterialModule],
      providers : [DataService, HttpClient],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatreManagemnentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
