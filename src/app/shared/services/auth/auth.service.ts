import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from './../../../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import {
  RegisterUser,
  LoginCredentials,
  LoginResponse,
  UserInfo
} from "../../models/IGetUsers";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = `${environment.apiUrl}`

  constructor(private readonly http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem("token");

    if (token === null) {
      return false;
    }

    const jwtService: JwtHelperService = new JwtHelperService();

    return !jwtService.isTokenExpired(token);
  }


  public register(register: RegisterUser): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, register);
  }

  public login(login: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, login);
  }

  public me(): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${this.apiUrl}/auth/me` , null);
  }

/*
  public logout(): Observable<string> {
    return this.http.post<string>("/auth/logout", undefined);
  }
*/

}
