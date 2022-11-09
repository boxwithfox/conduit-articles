import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './base-url.token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, @Inject(BASE_URL) private base_url: string ) {
  }

  login(email: string, password: string): Observable<Object> {
    return this.httpClient.post(`${this.base_url}/users/login`,
      {
        user: { email, password }
      }
    )
  }
}
