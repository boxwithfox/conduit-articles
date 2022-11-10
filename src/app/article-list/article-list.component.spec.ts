import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ArticleService } from '../article.service';

import { ArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let articleServiceStub;

  beforeEach(async () => {

    articleServiceStub = {
      articles: of([])
    }

    await TestBed.configureTestingModule({
      declarations: [ ArticleListComponent ],
      providers: [
        { provide: ArticleService, useValue: articleServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
