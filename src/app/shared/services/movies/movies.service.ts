import { map } from 'rxjs/operators';


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

public getPrices(id: number): Observable<IGetMovies>{
                     
  return this.http.get<IGetMovies>(`/movie/${id}`)
}

public getActors(id: number): Observable<IGetMovies>{
                     
  return this.http.get<IGetMovies>(`/movie/${id}`)
}

public getCategories(id: number): Observable<IGetMovies>{
                     
  return this.http.get<IGetMovies>(`/movie/${id}`)
}

public getTehnologies(id: number): Observable<IGetMovies>{
                     
  return this.http.get<IGetMovies>(`/movie/${id}`)
}


/*
public getPricesTehnologies(id: number): Observable<IGetMovies>{
                     
  return this.http.get<IGetMovies>(`${this.apiUrl}/movie/${id}`).pipe(map(responseData => {
              const ptArr = [];
              for(const key of responseData){
                if(responseData.)
              }
  }))
}*/


}
