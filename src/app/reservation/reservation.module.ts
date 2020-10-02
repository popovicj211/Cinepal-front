import { AuthGuard } from './../shared/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './components/reservation.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ReservationComponent
  }
];


@NgModule({
  declarations: [ReservationComponent],
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
     SharedModule,
     FormsModule, 
     ReactiveFormsModule
  ], exports:[
       ReservationComponent,
       RouterModule
  ]
})
export class ReservationModule { }
