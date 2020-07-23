import { environment } from './../../../../environments/environment';
import { IGetCategories } from './../../models/IGetCategories';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly apiUrl: string = `${environment.apiUrl}`

  constructor(private readonly http: HttpClient) { }

  public getCategories(id: number = 1): Observable<IGetCategories[]> {
    return this.http.get<IGetCategories[]>(`${this.apiUrl}/categories/${id}`);
  }

  public getTehnologies(id: number = 2): Observable<IGetCategories[]> {
    return this.http.get<IGetCategories[]>(`${this.apiUrl}/categories/${id}`);
  }

}
