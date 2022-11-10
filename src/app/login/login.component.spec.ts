import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { of, throwError } from 'rxjs';
 
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login'])

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        LoginComponent,
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder,
      ],
    })

    
  });
  
  beforeEach(() => {
    component = TestBed.inject(LoginComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty error when created', (done: DoneFn) => {
    component.errors.subscribe({
      next: (errors) => {
        expect(errors).toEqual('');
        done()
      },
      error: () => done.fail()
    })
  });

  it('should call auth service with email and password when onLogin called', (done: DoneFn) => {

    authServiceSpy.login.and.returnValue(of(<User>{ bio: '', email: '', image: '', token: '' }));
    component.loginForm.setValue({ 'email': 'email', 'password': 'password' });
    component.onLogin();
    expect(authServiceSpy.login).toHaveBeenCalledWith('email', 'password');
    component.errors.subscribe({
      next: (errors) => {
        expect(errors).toEqual('');
        done()
      },
      error: () => done.fail()
    })
  });

  it('should return error when login failed', (done: DoneFn) => {
    authServiceSpy.login.and.returnValue(throwError(() => {}));
    component.loginForm.setValue({ 'email': 'email', 'password': 'password' });
    component.onLogin();
    expect(authServiceSpy.login).toHaveBeenCalledWith('email', 'password');
    component.errors.subscribe({
      next: (errors) => {
        expect(errors).toEqual('Sorry, email or password are invalid :( ');
        done()
      },
      error: () => done.fail
    })
  })

});
