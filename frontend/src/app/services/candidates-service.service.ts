import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CandidatesServiceService {
  token = localStorage.getItem('token');

  constructor(
    private httpClient: HttpClient
  ) { }

  public GetCandidates(): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/candidates`,{token :this.token})
  }
}
