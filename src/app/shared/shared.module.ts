import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PipeTransformPipe } from './pipe/pipe-transform.pipe';


@NgModule({
  declarations: [PipeTransformPipe],
  imports: [
    CommonModule ,  HttpClientModule
  ], exports:[
     HttpClientModule
  ]
})
export class SharedModule { }
