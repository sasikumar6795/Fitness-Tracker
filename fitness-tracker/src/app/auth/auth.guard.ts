import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean {
        return this.authService.isAuth();
    }

}