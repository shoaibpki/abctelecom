import { TestBed } from '@angular/core/testing';

import { UserresolveGuard } from './userresolve.guard';

describe('UserresolveGuard', () => {
  let guard: UserresolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserresolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
