import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cats-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {
  }

}
