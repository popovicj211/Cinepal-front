
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}


  private activate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/signin"]);
      return false;
    }
    return true;
  }
   

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
