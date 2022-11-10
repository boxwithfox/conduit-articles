import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Artcile } from './article';
import { Author } from './author';

describe('ArticleServiceService', () => {

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
  
  let service: ArticleService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    
    apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', ['loadArticles']);
    apiServiceSpy.loadArticles.and.returnValue(of( { articles: [stubArticle1, stubArticle2] }));
    service = new ArticleService(apiServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('articles()', () => {

    it('should return an article list after initialization', (done: DoneFn) => {
      expect(apiServiceSpy.loadArticles).toHaveBeenCalled()
      service.articles.subscribe({
        next: (articles) => {
          expect(articles).toEqual([stubArticle1, stubArticle2]);
          done();
        },
        error: () => {
          done.fail()
        }
      })
    });

  });

});
