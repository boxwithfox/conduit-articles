import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _loggedUser = new BehaviorSubject<User | null>(null);
  // TODO: save token in the local storage and login user when he enters the application

  constructor(private api: ApiService) {
  }

  get loggedUser() {
    return this._loggedUser.asObservable();
  }

  login(email: string, password: string): Observable<User> {
    return this.api.login(email, password).pipe(
      map(response => response.user),
      tap(user => this._loggedUser.next(user)),
      tap(() => console.log('user logged in'))
    )
  }
}
