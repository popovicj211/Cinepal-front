import { SharedModule } from './../shared/shared.module';
import { RouterModule , Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesDetailsComponent } from './components/movies-details/movies-details.component';
import { AppRoutingModule } from '../app-routing.module';


const routes: Routes = [
  
       {
      path: '' , component: MoviesComponent , children:[
           { path: 'categories/:id' ,component: MoviesComponent},
           { path: 'page/:page' , component: MoviesComponent }  
       ]
      },
      {
        path: 'movie/:id' , component: MoviesDetailsComponent
      }
      
    /*   {path: '' , component: MoviesComponent },
        { path: 'categories/:id' ,component: MoviesComponent},
        { path: 'page/:page' , component: MoviesComponent }  */
      

];


@NgModule({
  declarations: [MoviesComponent, MoviesDetailsComponent],
  imports: [
    CommonModule,
   RouterModule.forChild(routes) 
  ],exports:[
      MoviesComponent,
      RouterModule
  ]
})
export class MoviesModule { }
