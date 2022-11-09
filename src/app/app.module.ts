import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './environments/environment';

import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { BASE_URL } from './base-url.token';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: BASE_URL, 
      useValue: environment.base_url 
    }
  ],
  bootstrap: [ArticleListComponent]
})
export class AppModule { }
