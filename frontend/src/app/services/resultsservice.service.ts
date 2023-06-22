import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResultsserviceService {
  token = localStorage.getItem('token');
  id = JSON.parse(localStorage.getItem('user'))["id"];
  

  constructor(private httpClient: HttpClient) { }

  public getResults(): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/results` , { token: this.token, user_id: this.id})
  }

  public getInterview(id): Observable<any>{
    return this.httpClient.post<any>(`${environment.baseUrl}/results/`+ id , { token: this.token})

  }

  
}
