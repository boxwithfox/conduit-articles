import { Component, Input, OnInit } from '@angular/core';
import { Artcile } from '../article';

@Component({
  selector: 'cats-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article!: Artcile;

  constructor() { }

  ngOnInit(): void {
  }

}
