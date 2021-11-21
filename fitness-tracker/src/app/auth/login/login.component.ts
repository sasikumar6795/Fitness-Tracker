import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared-UI/UIService';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading=false;
  private isLoadingSubs:Subscription;
  constructor(private authService: AuthService, private UIService:UIService) { }

  ngOnInit(): void {
    this.isLoadingSubs=this.UIService.isLoadingChanged.subscribe(
      status => {
        this.isLoading=status;
      }
    )
    this.loginForm = new FormGroup({
      email: new FormControl('',{validators: [Validators.required,Validators.email]
      }),
      password: new FormControl('',{validators: [Validators.required]
      }),
    })
  }

  onSubmit()
  {
    console.log(this.loginForm);
    this.authService.login({
        email: this.loginForm.value.email,
        password:this.loginForm.value.password
      })
  }

  ngOnDestroy(): void {
    this.isLoadingSubs.unsubscribe();
  }

}
