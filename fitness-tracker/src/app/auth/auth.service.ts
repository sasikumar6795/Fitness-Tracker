import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import {AngularFireAuth} from "angularfire2/auth"

@Injectable()
export class AuthService{
    private isAuthenticated=false;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private authFir: AngularFireAuth){}
    //when the user signup
    registerUser(authData: AuthData)
    {
       this.authFir.auth.createUserWithEmailAndPassword(authData.email,authData.password)
       .then(result => {
           console.log(result);
           this.authSuccessfully();
       })
       .catch(error => {
           console.log(error);
       })

        this.authChange.next(true);
        this.router.navigate(['/training'])
    }

    login(authData: AuthData)
    {
        this.authFir.auth.signInWithEmailAndPassword(authData.email,authData.password)
        .then(result => {
            console.log(result);
            this.authSuccessfully();
        })
        .catch(error => {
            console.log(error);
        })

       
    }

    logOut()
    {
        this.isAuthenticated=false;
        this.authSuccessfully();
    }

   

    isAuth()
    {
      return this.isAuthenticated;
    }

    private authSuccessfully()
    {
        this.isAuthenticated=true;
        this.authChange.next(false);
        this.router.navigate(['/login'])
    }
}