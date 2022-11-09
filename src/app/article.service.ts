import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artcile } from './article';
import { BASE_URL } from './base-url.token';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _articles: BehaviorSubject<Array<Artcile>> = new BehaviorSubject<Artcile[]>([]);

  constructor(private httpClient: HttpClient, @Inject(BASE_URL) private base_url: string ) {
    this.loadArticles();
  }

  loadArticles() {
    this.httpClient.get(`${this.base_url}/articles`)
      .subscribe(
        {
          next: 
            (res) => {
              // TODO: add mapper and separate http service
              let articles = (<Object[]>(res as any).articles).map((article: any) => (<Artcile>{...article}));
              this._articles.next(articles);
            },
          error: (err: Error) => console.error(`Error when retrieving list of articles - ${err.message}`)
        }
      )
  }

  get articles() {
    return this._articles.asObservable();
  }



}
