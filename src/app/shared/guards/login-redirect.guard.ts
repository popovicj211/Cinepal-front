import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {
 

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  private activate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('logged in');
      this.router.navigate(['/movies']);
      return false;
    }

    return true;
  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.activate();
  }
  
}
