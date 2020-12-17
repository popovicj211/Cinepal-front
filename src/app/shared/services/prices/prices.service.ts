import { IGetPrices } from './../../models/IGetPrices';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(private readonly http: HttpClient) { }

public getPrices(): Observable<IGetPrices[]>{
  return this.http.get<IGetPrices[]>(`/auth/price`);
}

}
