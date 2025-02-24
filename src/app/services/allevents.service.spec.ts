import { TestBed } from '@angular/core/testing';

import { AlleventsService } from './allevents.service';

describe('AlleventsService', () => {
  let service: AlleventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlleventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
