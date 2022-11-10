import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Artcile } from './article';
import { Author } from './author';


describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = new ApiService(httpClientSpy, 'BASE_URL');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  describe('loadArticles', () => {

    let expecrtedArticles: Artcile[];
    const stubAuthorJohnDoe: Author = {
      bio: 'bio of John Doe',
      image: 'john.jpg',
      following: false,
      username: 'Cat of John Doe',
    }
    
    const stubArticle1: Artcile = {
      author: stubAuthorJohnDoe,
      body: 'stub body',
      createdAt: new Date(2022, 5, 5),
      updatedAt: new Date(2022, 5, 6),
      description: 'stub description',
      favoritesCount: 120,
      favourited: false,
      slug: 'stub slug',
      tagList: ['stub tag'],
      title: 'stub title',
    }
    
    const stubArticle2: Artcile = {
      author: stubAuthorJohnDoe,
      body: 'stub body 2',
      createdAt: new Date(2022, 5, 7),
      updatedAt: new Date(2022, 5, 8),
      description: 'stub description 2',
      favoritesCount: 0,
      favourited: true,
      slug: 'stub slug 2',
      tagList: ['stub tag 2'],
      title: 'stub title 2',
    }

    beforeEach(() => {
      expecrtedArticles = [
        stubArticle1,
        stubArticle2
      ];
    })
    
    it('Should return articles', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of({ articles: expecrtedArticles }));
      service.loadArticles().subscribe({
          next: result => {
            expect(result.articles).toEqual(expecrtedArticles);
            done();
          },
          error: () => done.fail('error when loading articles')
        }
      )
    })

    it('Should throw error when http error occures', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(throwError(() => {}));
      service.loadArticles().pipe(tap((a) => console.log(a))).subscribe({
        next: () => { done.fail('expected error on articles'); },
        error: () => { done() }
      }
    )
    });

  });

});
