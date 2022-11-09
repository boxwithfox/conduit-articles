import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'cats-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  _errors = new BehaviorSubject<string>('');

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

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
    this.loginService.login(email, password).subscribe({
      next: () => { this.router.navigateByUrl('')},
      error: (error) => {  
        this._errors.next('Sorry, email or password are invalid :( ')
      } 
    })
  }

}
