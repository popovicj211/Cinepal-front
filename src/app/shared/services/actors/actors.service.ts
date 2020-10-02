import { IGetActors } from './../../models/IGetActors';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private readonly apiUrl: string = `${environment.apiUrl}`

  constructor(private readonly http: HttpClient) { }

  public getActors(perPage:number , page:number | null): Observable<IGetActors[]> {
    if(isNaN(page)){
      return this.http.get<IGetActors[]>(`/auth/actors?perPage=${perPage}`);
     }else if(page&&perPage){
      return this.http.get<IGetActors[]>(`/auth/actors?perPage=${perPage}&page=${page}`);
     }else{
      return this.http.get<IGetActors[]>(`/auth/actors`);
     }
  }

 

}
