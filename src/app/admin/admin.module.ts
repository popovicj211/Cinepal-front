import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import {  FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AdminUsersComponent } from './components/users/admin-users.component';
import { AdminCategoriesComponent } from './components/categories/admin-categories.component';
import { MoviesAdminComponent } from './components/movies/movies-admin.component';
import { AdminActorsComponent } from './components/actors/admin-actors.component';
import { AdminPricesComponent } from './components/prices/admin-prices.component';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators"

const routes: Routes = [
         {
             path: '',
             component: AdminComponent,children:[
              {
                path: 'users',
                component: AdminUsersComponent
              },
               {
                 path: 'users/page/:page' ,
                  component: AdminUsersComponent  
               },
               {
                path: 'users/:id',
                component: AdminUsersComponent
              },
          
              {
                path: 'movies',
                component: MoviesAdminComponent
              },
               {
                 path: 'movies/page/:page' ,
                  component: MoviesAdminComponent   
               }
               ,
               {
                path: 'movies/:id',
                component: MoviesAdminComponent
              },
              {
                path: 'categories',
                component: AdminCategoriesComponent
              } ,
              {
                path: 'actors',
                component: AdminActorsComponent
              } 
              ,
               {
                 path: 'actors/page/:page' ,
                  component: AdminActorsComponent  
               }
             ]
        }
      
]



@NgModule({
  declarations: [AdminComponent, AdminUsersComponent, AdminCategoriesComponent, MoviesAdminComponent, AdminActorsComponent, AdminPricesComponent],
  imports: [
    CommonModule , NgbModule  , FormsModule  , ReactiveFormsModule , RouterModule.forChild(routes) , RxReactiveFormsModule
  ],exports:[
      AdminComponent, 
      RouterModule
  ]
})
export class AdminModule { }
