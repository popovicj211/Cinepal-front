import { IGetSlides } from './../../models/IGetSlides';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SlidesService {
 
private slides: IGetSlides
private readonly apiUrl: string = `${environment.apiUrl}`

  constructor(private readonly http: HttpClient) { }
 
  public getSlides(): Observable<IGetSlides[]> {
    return this.http.get<IGetSlides[]>(`/slidess`);
  }

}
