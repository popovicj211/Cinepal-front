

import { Injectable } from '@angular/core';
import { IGetMovies} from '../../models/IGetMovies'
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

 public urlImg = 'http://localhost:8000/assets/images/movies/'

  private obj: object = { "id" : 0 , "subid" : 0}

  private readonly apiUrl: string = `${environment.apiUrl}`

  constructor(private readonly http: HttpClient) { }

  public getAllMovies(perPage: number , page: number | null): Observable<IGetMovies[]> {
       if(isNaN(page)){
        return this.http.get<IGetMovies[]>(`${this.apiUrl}/moviess?perPage=${perPage}`);
       }else{
        return this.http.get<IGetMovies[]>(`${this.apiUrl}/moviess?perPage=${perPage}&page=${page}`);
       }
  }

  public getNewMovies(): Observable<IGetMovies[]>{
        return this.http.get<IGetMovies[]>(`${this.apiUrl}/movies/new`);
  }

public getMoviesCategory(id: number  , subid: number): Observable<IGetMovies[]>{
                     
     return this.http.get<IGetMovies[]>(`${this.apiUrl}/movies/categories/${id}/subcategory/${subid}`)
}
/*
public getMoviesTehnologies(id: number = 2 , cat:number): Observable<IGetMovies[]>{
  return this.http.get<IGetMovies[]>(`${this.apiUrl}/movies/categories/${id}/subcategory/${cat}`)
}
*/

public getMovieDetail(id: number): Observable<IGetMovies>{
                     
  return this.http.get<IGetMovies>(`${this.apiUrl}/movie/${id}`)
}

}
