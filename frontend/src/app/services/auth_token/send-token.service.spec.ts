import { TestBed } from '@angular/core/testing';

import { SendTokenService } from './send-token.service';

describe('SendTokenService', () => {
  let service: SendTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
