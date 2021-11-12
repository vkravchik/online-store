import { TestBed } from '@angular/core/testing';

import { SubscriptionHelperService } from './subscription-helper.service';

describe('SubscriptionHelperService', () => {
  let service: SubscriptionHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
