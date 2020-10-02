import { SendSeatchecker ,GetSeatchecker } from './../../models/IGetSeatchecker';
import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatcheckerService {
  private readonly apiUrl: string = `${environment.apiUrl}`;
  private headers: HttpHeaders;

  constructor(private readonly http: HttpClient) { 
    this.headers = new HttpHeaders();
  //  this.headers.append('Content-Type', 'application/json');

  }
/*
  public getSeatchecker(free: number): Observable<GetSeatchecker[]> {
    return this.http.get<GetSeatchecker[]>(`${this.apiUrl}/seatchecker/free/${free}`);
  }


  public updateSeatchecker(free: number , data: {}): Observable<null> {
    return this.http.put<null>(`${this.apiUrl}/seatchecker/free/${free}`, data );
  }*/

  public getSeatchecker(free: number): Observable<GetSeatchecker[]> {
    return this.http.get<GetSeatchecker[]>(`/auth/seatchecker/free/${free}`);
  }

/*
  public updateSeatchecker(free: number , data){
 
    return this.http.put(`/auth/seatchecker/free/${free}`, data );
  }*/

/*
  public updateSeatchecker(free: number , data): Observable<null> {
    this.headers.set('Content-Type','application/x-www-form-urlencoded');
    return this.http.put<null>(`/auth/seatchecker/free/${free}`, data  );
  }*/

  public updateSeatchecker(free: number , data){
    this.headers.append('Content-Type','application/x-www-form-urlencoded');
    return this.http.put(`/auth/seatchecker/free/rt/${free}` , data);
  }
  

}
