import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';
describe('UtilsService', () => {
  let service: UtilsService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UtilsService] });
    service = TestBed.get(UtilsService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
