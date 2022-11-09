import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from './environments/environment';

import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { BASE_URL } from './base-url.token';
import { LoginComponent } from './login/login.component';
import { App } from './app.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleComponent,
    LoginComponent,
    App
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ArticleListComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [
    {
      provide: BASE_URL, 
      useValue: environment.base_url 
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
