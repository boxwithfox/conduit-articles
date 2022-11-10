import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Artcile } from './article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _articles: BehaviorSubject<Array<Artcile>> = new BehaviorSubject<Artcile[]>([]);

  constructor(private api: ApiService) {
    this.loadArticles();
  }

  loadArticles() {
    this.api.loadArticles()
      .subscribe(
        {
          next: 
            (res) => {
              // TODO: add mapper and separate http service
              let articles = (res.articles).map((article: any) => (<Artcile>{...article}));
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
