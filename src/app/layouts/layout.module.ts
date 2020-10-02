import { AuthGuard } from './../shared/guards/auth.guard';

import { HeaderComponent } from './components/default/partials/header/header.component';
import { SliderComponent } from './components/default/partials/slider/slider.component';
import { FooterComponent } from './components/default/partials/footer/footer.component';
import { RouterModule , Routes } from '@angular/router';
//import { SharedcomponentsModule } from './../sharedcomponents/sharedcomponents.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'movies',
    component: DefaultComponent,
    loadChildren: () => import('../movies/movies.module').then(mod => mod.MoviesModule)
  },
  {
    path: 'contact',
    component: DefaultComponent,
    loadChildren: () => import('../contact/contact/contact.module').then(mod => mod.ContactModule)
  },
  {
    path: 'reservation/:id',
    component: DefaultComponent,
    loadChildren: () => import('../reservation/reservation.module').then(mod => mod.ReservationModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'admin',
    component: DefaultComponent,
    loadChildren: () => import('../admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
  
];

@NgModule({
  declarations: [DefaultComponent , HeaderComponent, SliderComponent , FooterComponent ],
  imports: [
    CommonModule  , RouterModule.forChild(routes) , NgbModule 
  ],
  exports: [RouterModule ,DefaultComponent, HeaderComponent, SliderComponent , FooterComponent]
})
export class LayoutModule { }
