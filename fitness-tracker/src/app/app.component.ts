import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  constructor(private authService: AuthService){}
  title = 'fitness-tracker';

  ngOnInit(): void {
    this.authService.initAuthListener();
    
  }

 
}
