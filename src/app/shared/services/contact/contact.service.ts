import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../models/IGetContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly apiUrl: string = `${environment.apiUrl}`

  constructor(private readonly http: HttpClient) { }

  public sendContact(contact: Contact): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`/contactt`, contact);
  }

}
