import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared-UI/shared-module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations:[SignupComponent,LoginComponent],
    imports:[SharedModule,FormsModule],
    exports:[]
})
export class AuthModule
{

}