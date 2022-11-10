import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { User } from '../user';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceStub: { loggedUser: Observable<User | null>};

  beforeEach(async () => {

    authServiceStub = {
      loggedUser: of({ bio: '', email: '', image: '', token: '', username: 'John Doe' })
    }

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [ 
        { provide: AuthService, useValue: authServiceStub } 
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display Login In menu item when user is not logged in', () => {
    authServiceStub.loggedUser = of(null);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let loginLink = fixture.nativeElement.querySelector('#loginLink');
    expect(loginLink.textContent).toEqual('Log In')
  })

  it('should display username menu item when user is logged in', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let profileLink = fixture.nativeElement.querySelector('#profileLink');
    expect(profileLink.textContent).toEqual('Hello John Doe')
  })

});
