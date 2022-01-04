import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouting } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path : '', component: WelcomeComponent},
  {path : 'training', component: TrainingComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),AuthRouting],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
