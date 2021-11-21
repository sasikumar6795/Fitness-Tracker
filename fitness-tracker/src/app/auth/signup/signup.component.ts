import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared-UI/UIService';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading=false;
  private isLoadingSubs:Subscription;

  constructor(private authService: AuthService,private UIService:UIService) { }
  

  ngOnInit(): void {
    this.isLoadingSubs=this.UIService.isLoadingChanged.subscribe(
      status => {
        this.isLoading=status;
      }
    )
  }


  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy(): void {
    this.isLoadingSubs.unsubscribe();
  }

}
