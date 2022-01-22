import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared-UI/UIService';
import { AuthService } from '../auth.service';
import  * as fromapp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  //isLoading=false;
  isLoading$:Observable<Boolean>;
  private isLoadingSubs:Subscription;
  constructor(private authService: AuthService, private UIService:UIService, private store:Store<{ui:fromapp.state}>) { }

  ngOnInit(): void {
    this.isLoading$ =  this.store.pipe(map(state => state.ui.isLoading));
    //ngrx - state management
    // this.isLoadingSubs=this.UIService.isLoadingChanged.subscribe(
    //   status => {
    //     this.isLoading=status;
    //   }
    // )
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

  

}
