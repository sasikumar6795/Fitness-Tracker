import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import {AngularFireAuth} from "angularfire2/auth"
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService{
    private isAuthenticated=false;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private authFir: AngularFireAuth, private trainingService:TrainingService){}
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
       this.authFir.auth.createUserWithEmailAndPassword(authData.email,authData.password)
       .then(result => {
           console.log("signup",result);
       })
       .catch(error => {
           console.log(error);
       })
    }

    login(authData: AuthData)
    {
        this.authFir.auth.signInWithEmailAndPassword(authData.email,authData.password)
        .then(result => {
            console.log("login",result);
        })
        .catch(error => {
            console.log(error);
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