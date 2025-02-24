import { TestBed } from '@angular/core/testing';

import { UpdateeventService } from './updateevent.service';

describe('UpdateeventService', () => {
  let service: UpdateeventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateeventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
