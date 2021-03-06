import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import {AngularFireAuth} from "angularfire2/auth"
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UIService } from "../shared-UI/UIService";
import { Store } from "@ngrx/store";
import * as fromApp from  '../app.reducer';

@Injectable()
export class AuthService{
    private isAuthenticated=false;
    authChange = new Subject<boolean>();

    constructor(
      private router: Router,
      private authFir: AngularFireAuth, 
      private trainingService:TrainingService, 
      private UIService:UIService,
      private store: Store<{ui: fromApp.state}>
      ){}
    initAuthListener() {
        this.authFir.authState.subscribe(user => {
          if (user) {
            this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/training']);
          } else {
            this.trainingService.cancelSubscription();
            this.authChange.next(false);
            this.router.navigate(['/login']);
            this.isAuthenticated = false;
          }
        });
      }
    //when the user signup
    registerUser(authData: AuthData)
    {
      //this.UIService.isLoadingChanged.next(true);
      this.store.dispatch({type:'START_LOADING'});
       this.authFir.auth.createUserWithEmailAndPassword(authData.email,authData.password)
       .then(result => {
           console.log("signup",result);
           //this.UIService.isLoadingChanged.next(false);
           this.store.dispatch({type:'STOP_LOADING'});
       })
       .catch(error => {
           //this.UIService.isLoadingChanged.next(false);
           this.store.dispatch({type:'STOP_LOADING'});

           this.UIService.showSnackBar(error.message,null,3000);
          //  this.snackBar.open(error, null, {
          //    duration:3000
          //  })
          
       })
    }

    login(authData: AuthData)
    {
      //this.UIService.isLoadingChanged.next(true);
      this.store.dispatch({type:'START_LOADING'});
        this.authFir.auth.signInWithEmailAndPassword(authData.email,authData.password)
        .then(result => {
          console.log("loginResult",result);
          //this.UIService.isLoadingChanged.next(false);
          this.store.dispatch({type:'STOP_LOADING'});
        })
        .catch(error => {
          //this.UIService.isLoadingChanged.next(false);
          this.store.dispatch({type:'STOP_LOADING'});
          this.UIService.showSnackBar(error.message,null,3000);
          // this.snackBar.open(error, null, {
          //   duration:3000
          // })
         
        })   
    }

    logOut()
    {
        this.authFir.auth.signOut();
    }

   

    isAuth()
    {
      return this.isAuthenticated;
    }

   
}