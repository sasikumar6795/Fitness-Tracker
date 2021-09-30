import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable()
export class AuthService{
    private user: User
    authChange = new Subject<boolean>();

    constructor(private router: Router){}
    //when the user signup
    registerUser(authData: AuthData)
    {
        this.user= {
            email:authData.email,
            userId: Math.round(Math.random() * 10000)
        };

        this.authChange.next(true);
        this.router.navigate(['/training'])
    }

    login(authData: AuthData)
    {
        this.user= {
            email:authData.email,
            userId: Math.round(Math.random() * 10000)
        }; 

        this.authSuccessfully();
    }

    logOut()
    {
        this.user=null;
        this.authSuccessfully();
    }

    getUser()
    {
        // since this is an object other class can change the original history hence we are putting ...this.userId
        //object spread operator
        return {...this.user};
    }

    isAuth()
    {
       return  this.user!=null;
    }

    private authSuccessfully()
    {
        this.authChange.next(false);
        this.router.navigate(['/login'])
    }
}