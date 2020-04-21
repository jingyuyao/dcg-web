import { TestBed } from '@angular/core/testing';

import { GameClientService } from './game-client.service';

describe('GameClientService', () => {
  let service: GameClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
