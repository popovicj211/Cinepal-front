import { IGetMovies } from './../../models/IGetMovies';
import { SendReservation } from './../../models/IGetReservation';
import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly apiUrl: string = `${environment.apiUrl}`;

  constructor(private readonly http: HttpClient) { }

   public datetimeTo(id: number): Observable<IGetMovies>{
    return this.http.get<IGetMovies>(`/movie/${id}`);
         
   }

  public sendReservation(reservation: SendReservation): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`/auth/reservationn`, reservation);
  }

}
