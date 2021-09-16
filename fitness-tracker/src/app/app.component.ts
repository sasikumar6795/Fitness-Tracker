import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fitness-tracker';

  @ViewChild('sideNav')
  sideNav
  openToggle()
  {
    console.log(this.sideNav);
  }
}
