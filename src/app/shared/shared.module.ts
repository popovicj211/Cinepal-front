import { HeaderInterceptorService } from './interceptors/header-interceptor.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PipeTransformPipe } from './pipe/pipe-transform.pipe';


@NgModule({
  declarations: [PipeTransformPipe],
  imports: [
    CommonModule ,  HttpClientModule
  ], exports:[
     HttpClientModule
  ],
  providers: [
    {
      multi: true,
      useClass: AuthInterceptorService,
      provide: HTTP_INTERCEPTORS
    },
    {
      multi: true,
      useClass: HeaderInterceptorService,
      provide: HTTP_INTERCEPTORS
    }
  ]
})
export class SharedModule { }
