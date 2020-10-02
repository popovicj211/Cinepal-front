
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule , Routes } from '@angular/router';
import { MoviesModule } from './../movies/movies.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    SharedModule
  ],
  exports:[
       HomeComponent,
       RouterModule
  ]
})
export class HomeModule { }
