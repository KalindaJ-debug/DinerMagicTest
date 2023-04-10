import { TestBed } from '@angular/core/testing';

import { PostMethodInterceptor } from './post-method.interceptor';

describe('PostMethodInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostMethodInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PostMethodInterceptor = TestBed.inject(PostMethodInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
