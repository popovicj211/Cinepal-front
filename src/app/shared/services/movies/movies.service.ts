
import { addMovie, updateMovie } from './../../models/IGetMovies';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { IGetMovies} from '../../models/IGetMovies'
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

 public urlImg = environment.urlServer + '/assets/images/movies/'

  private obj: object = { "id" : 0 , "subid" : 0}

  private headers: HttpHeaders
  private readonly apiUrl: string = `${environment.apiUrl}`

  constructor(private readonly http: HttpClient) { 
    this.headers = new HttpHeaders();
  }

  public getAllMovies(perPage: number , page: number | null ): Observable<IGetMovies[]> {
       if(isNaN(page)){
        return this.http.get<IGetMovies[]>(`/moviess?perPage=${perPage}`);
       }else if(page&&perPage){
        return this.http.get<IGetMovies[]>(`/moviess?perPage=${perPage}&page=${page}`);
       }else{
        return this.http.get<IGetMovies[]>(`/moviess`);
       }
  }



  public getNewMovies(): Observable<IGetMovies[]>{
        return this.http.get<IGetMovies[]>(`/movies/new`);
  }

public getMoviesCategory(id: number  , subid: number): Observable<IGetMovies[]>{
                     
     return this.http.get<IGetMovies[]>(`/movies/categories/${id}/subcategory/${subid}`)
}
/*
public getMoviesTehnologies(id: number = 2 , cat:number): Observable<IGetMovies[]>{
  return this.http.get<IGetMovies[]>(`${this.apiUrl}/movies/categories/${id}/subcategory/${cat}`)
}
*/

public getMovieDetail(id: number): Observable<IGetMovies>{
                     
  return this.http.get<IGetMovies>(`/movie/${id}`)
}

public getAllMoviesAdmin(perPage: number , page: number | null ): Observable<IGetMovies[]> {
  if(isNaN(page)){
   return this.http.get<IGetMovies[]>(`/auth/movies?perPage=${perPage}`);
  }else if(page&&perPage){
   return this.http.get<IGetMovies[]>(`/auth/movies?perPage=${perPage}&page=${page}`);
  }else{
   return this.http.get<IGetMovies[]>(`/auth/movies`);
  }
}

public addMovie(movie: addMovie): Observable<{ message: string }> {
  this.headers.append('Content-Type','multipart/form-data');
  return this.http.post<{ message: string }>(`/auth/movies`, movie);
}
/*
public updateMovie(movie: IGetMovies , id: number , img: number): Observable<null> {
  this.headers.append('Content-Type','application/x-www-form-urlencoded');
  return this.http.put<null>(`/auth/movies/${id}/image/${img}`, movie);
}*/
public updateMovie(movie: updateMovie): Observable<null> {
//  this.headers.append('Content-Type','application/x-www-form-urlencoded');
this.headers.append('Content-Type','multipart/form-data');
  return this.http.put<null>(`/auth/movies/${movie.id}/image/${movie.img.id}`, movie);
}

public editMovie(id: number): Observable<IGetMovies>{
            
  if (id === 0) {
    return of(this.initializeProduct());
  } 
  return this.http.get<IGetMovies>(`/auth/movies/${id}/edit`)
}

public deleteMovie(id: number): Observable<null>{
  return this.http.delete<null>(`/auth/movies/${id}`);
}

private initializeProduct(): IGetMovies {
  // Return an initialized object
  return {
    id: 0,
    name: null,
    desc: null,
    rel: null,
    runtime: null,
    img: null,
    year: null,
    tehnologies: null,
    categories: null ,
    actors: null ,
    price: null
  };
}


}
