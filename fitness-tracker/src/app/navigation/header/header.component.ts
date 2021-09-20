import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authStatus =false;
  authSubscription:Subscription;
  @Output()
  sideNav = new EventEmitter<void>();

  constructor(private authService: AuthService) { }
  

  ngOnInit(): void {
   this.authSubscription=this.authService.authChange.subscribe(
      authChange => {
        this.authStatus=authChange;
      }
    )
  }

  onToggleSideNav()
  {
    this.sideNav.emit();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
