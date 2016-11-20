/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PouleService } from './poule.service';

describe('Service: Poule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PouleService]
    });
  });

  it('should ...', inject([PouleService], (service: PouleService) => {
    expect(service).toBeTruthy();
  }));
});
