import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import {  FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AdminUsersComponent } from './components/users/admin-users.component';
import { AdminCategoriesComponent } from './components/categories/admin-categories.component';
import { MoviesAdminComponent } from './components/movies/movies-admin.component'

const routes: Routes = [
         {
             path: '',
             component: AdminComponent,children:[
              {
                path: 'users',
                component: AdminUsersComponent
              },
              {
                path: 'movies',
                component: MoviesAdminComponent
              },
              {
                path: 'categories',
                component: AdminCategoriesComponent
              } 
             ]
        },
      
]



@NgModule({
  declarations: [AdminComponent, AdminUsersComponent, AdminCategoriesComponent, MoviesAdminComponent],
  imports: [
    CommonModule , NgbModule  , FormsModule  , ReactiveFormsModule , RouterModule.forChild(routes)
  ],exports:[
      AdminComponent, 
      RouterModule
  ]
})
export class AdminModule { }
