import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
             {
                 path:"signin" , component: LoginComponent
             },
             {
              path:"signup" , component: RegisterComponent
             }
]


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
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
