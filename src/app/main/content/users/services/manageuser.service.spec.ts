import { TestBed, inject } from '@angular/core/testing';

import { ManageuserService } from './manageuser.service';

describe('ManageuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageuserService]
    });
  });

  it('should be created', inject([ManageuserService], (service: ManageuserService) => {
    expect(service).toBeTruthy();
  }));
});
