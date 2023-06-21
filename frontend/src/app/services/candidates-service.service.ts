import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesServiceService {
  token = localStorage.getItem('token');

  constructor(
    private httpClient: HttpClient
  ) { }

  public GetCandidates(): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/candidates',{token :this.token})
  }
}
