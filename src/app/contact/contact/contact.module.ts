import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  }
]

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ], exports:[
     RouterModule,
     ContactComponent
  ]
})
export class ContactModule { }
