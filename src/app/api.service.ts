import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Artcile } from './article';
import { BASE_URL } from './base-url.token';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, @Inject(BASE_URL) private base_url: string) { }

  // TODO: Handle common API errors

  loadArticles(): Observable<{ articles: Artcile[] }> {
    return this.httpClient.get<{ articles: Artcile[] }>(`${this.base_url}/articles`)
  }

  login(email: string, password: string): Observable<{ user: User }> {
    return this.httpClient.post<{ user: User}>(`${this.base_url}/users/login`, {
      user: { email, password }
      }
    )
  }
}
