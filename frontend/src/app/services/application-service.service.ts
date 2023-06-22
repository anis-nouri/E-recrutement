import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {
  token = localStorage.getItem('token');

  constructor(private httpClient: HttpClient) { }


  public getTest(id): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/application/`+ id , { token: this.token})
  }

  public apply(application): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/application/`+ application.offer_id +'/apply' ,{ token: this.token, app: application})
  }
  public verifApplication(app): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/verify` , app);
  }
  public respond(accepted,phone,offerid,userid): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/respond/`+ offerid + '/' + userid , {accepted: accepted,phone:phone});
  }
  public interview(date,location,offerid,userid): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/interview/`+ offerid + '/' + userid , {interv_date: date,interv_location: location});
  }
  
}

