
import { NgModule, Component } from '@angular/core';
import {RouterModule ,  Routes,  PreloadAllModules } from '@angular/router';



const routes: Routes = [
  /*
   {  path:'' , component: HomeComponent  },
  { path: 'movies' , component: MoviesComponent } ,
  { path: 'movies/page/:page' , component: MoviesComponent } ,
    { path: 'movies/categories/:id' ,component: MoviesComponent},
    {path: 'movie/:id' , component: MoviesDetailsComponent },

    {path: 'reservation/:id' , component: ReservationComponent},
   {  path:'admin' , component: AdminComponent  },
   {  path:'admin/:name' , component: AdminComponent  },
   {  path:'signin' , component: LoginComponent  },
   {  path:'signup' , component: RegisterComponent  },
    { path: 'contact' , component: ContactComponent }

*/


{
  path: "",
  loadChildren: () =>
    import("./layouts/layout.module").then(m => m.LayoutModule)
},
{
  path: "auth",
  loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
}
 
 


/*

{
  path: '',
  loadChildren: () =>
    import('./layouts/layout.module').then(mod => mod.LayoutModule)
},
{
  path: 'signin',
  loadChildren: () =>
    import('./auth/auth.module').then(mod => mod.AuthModule)
}
*/


  ];
@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


  /* {
        path: 'movies' , component: MoviesComponent , children:[
            { path: 'categories/:id' ,component: MoviesComponent}
        ]
   } ,*/