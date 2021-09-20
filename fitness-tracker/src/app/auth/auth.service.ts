import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
export class AuthService{
    private user: User
    authChange = new Subject<boolean>();
    //when the user signup
    registerUser(authData: AuthData)
    {
        this.user= {
            email:authData.email,
            userId: Math.round(Math.random() * 10000)
        };

        this.authChange.next(true);
    }

    login(authData: AuthData)
    {
        this.user= {
            email:authData.email,
            userId: Math.round(Math.random() * 10000)
        }; 

        this.authChange.next(true);
    }

    logOut()
    {
        this.user=null;
        this.authChange.next(false);
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
}