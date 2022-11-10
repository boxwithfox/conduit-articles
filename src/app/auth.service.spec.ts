import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs'

import { AuthService } from './auth.service';
import { BASE_URL } from './base-url.token';
import { User } from './user';

let apiServiceSpy: jasmine.SpyObj<ApiService>;

describe('AuthService', () => {
  let service: AuthService;

  const mockUser: User = {
    bio: 'bio',
    email: 'email',
    image: 'image',
    token: 'token',
    username: 'username'
  }

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['login'])
    
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ApiService, use: apiServiceSpy },
        { provide: BASE_URL, useValue: 'BASE_URL' },
        AuthService
      ]
    });
    service = new AuthService(apiServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loggedUser ', () => {
    it('should return null when user is not logged', (done: DoneFn) => {
      service.loggedUser.subscribe({
        next: user => {
          expect(user).toBeNull();
          done();
        },
        error: () => done.fail('loggedUser should not return error')
      })
    });
  
    it('Should return user after user loggs in', (done: DoneFn) => {

      apiServiceSpy.login.and.returnValue(of({ user: mockUser }));
  
      service.login('email', 'password').subscribe({
        next: () => {
          service.loggedUser.subscribe({
            next: user => {
              expect(user).toEqual(mockUser);
              done();
            },
            error: () => done.fail('loggedUser should not return error')
          })
        }
      });
    })
  
  })

  describe('login ', () => {
    
    it('should return logged in user when called', (done: DoneFn) => {
      apiServiceSpy.login.and.returnValue(of({ user: mockUser }));
      service.login('email', 'password').subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
          done();
        },
        error: () => done.fail('login should not throw errors')
      })
    });

    it(' should return error when failed', (done: DoneFn) => {
      apiServiceSpy.login.and.returnValue(throwError(() => {}));
      service.login('email', 'password').subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
          done.fail('error should be thrown when login fails');
        },
        error: () => done()
      })
    })

  })
});
