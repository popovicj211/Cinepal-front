import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserModule  } from '@angular/platform-browser';
import { DefaultComponent } from './layouts/components/default/default.component';
import { ContactModule } from './contact/contact/contact.module';
import { AdminModule } from './admin/admin.module';
import { HomeModule } from './home/home.module';
//import { SharedcomponentsModule } from './sharedcomponents/sharedcomponents.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

      
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule , HttpClientModule /*, SharedcomponentsModule , HomeModule , AdminModule , AuthModule , ContactModule*/ ,  BrowserAnimationsModule , SharedModule
  ]/*,exports:[ 
       AppRoutingModule
  ]*/,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
