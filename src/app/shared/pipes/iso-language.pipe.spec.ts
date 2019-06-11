import { TestBed } from '@angular/core/testing';
import { DataService } from '../services/data.service';
import { IsoLanguagePipe } from './iso-language.pipe';
describe('IsoLanguagePipe', () => {
  let pipe: IsoLanguagePipe;
  beforeEach(() => {
    const dataServiceStub = { languagesList: {} };
    TestBed.configureTestingModule({
      providers: [
        IsoLanguagePipe,
        { provide: DataService, useValue: dataServiceStub }
      ]
    });
    pipe = TestBed.get(IsoLanguagePipe);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms X to Y', () => {
    const value: any = 'Y';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
  it('transforms X to Y else part', () => {
    const value: any = '';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('');
  });
 it('english name exists in data', () => {
    const value: any = '';
    const args: string[] = [];
    const data = {english_name : 'Bumblebee'};
    expect(pipe.transform(value, args)).toEqual('');
  });
});
