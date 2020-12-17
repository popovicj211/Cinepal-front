import { addMovie } from './../../models/IGetMovies';
import { Observable, of } from 'rxjs';
import { IGetUser, addUser } from './../../models/IGetUsers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders
  constructor(
    private readonly http: HttpClient
  ) { 
       this.headers = new HttpHeaders();
  }

  public getUsers(perPage:number , page:number | null): Observable<IGetUser[]> {
    if(isNaN(page)){
      return this.http.get<IGetUser[]>(`/auth/users?perPage=${perPage}`);
     }else if(page&&perPage){
      return this.http.get<IGetUser[]>(`/auth/users?perPage=${perPage}&page=${page}`);
     }else{
      return this.http.get<IGetUser[]>(`/auth/users`);
     }
  }

    public addUser(data: addUser): Observable<{message:string}>{
      return this.http.post<{ message: string }>(`/auth/users`, data);
    }

    public updateUser(data: addUser ): Observable<null>{
      this.headers.append('Content-Type','application/x-www-form-urlencoded');
      return this.http.put<null>(`/auth/users/${data.id}` , data);
    }

    public getUserEdit(id:number): Observable<IGetUser>{
      if (id === 0) {
        return of(this.initializeProduct());
      } 
      return this.http.get<IGetUser>(`/auth/users/${id}/edit`);
    }

    public deleteUser(id: number): Observable<null>{
      return this.http.delete<null>(`/auth/users/${id}`);
    }


    private initializeProduct(): addUser {
      // Return an initialized object
      return {
        id: 0,
        name: null,
        username: null,
        email: null,
        password: null,
         role: null
       };
    }

}
