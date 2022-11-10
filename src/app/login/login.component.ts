import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cats-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  _errors = new BehaviorSubject<string>('');

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  get errors() {
    return this._errors.asObservable();
  }

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  ngOnInit(): void {
  }

  onLogin(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(email, password).subscribe({
      next: () => { this.router.navigateByUrl('')},
      error: (error: Error) => {  
        this._errors.next('Sorry, email or password are invalid :( ')
      } 
    })
  }

}
