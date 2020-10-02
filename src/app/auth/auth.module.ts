import { LoginRedirectGuard } from './../shared/guards/login-redirect.guard';
import { AuthGuard } from './../shared/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [
             {
               path:"signin" , component: LoginComponent , canActivate:[LoginRedirectGuard]
             },
             {
              path:"signup" , component: RegisterComponent, canActivate:[LoginRedirectGuard]
             },
             {
              path:"logout" , component: LogoutComponent , canActivate:[AuthGuard] 
             }
]


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) ,
    FormsModule,
    ReactiveFormsModule,
  ], exports:[
    LoginComponent, RegisterComponent
  ]
})
export class AuthModule { }
