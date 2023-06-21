import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {
  token = localStorage.getItem('token');

  constructor(private httpClient: HttpClient) { }


  public getTest(id): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/application/'+ id , { token: this.token})
  }

  public apply(application): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/application/'+ application.offer_id +'/apply' ,{ token: this.token, app: application})
  }
  public verifApplication(app): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/verify' , app);
  }
  public respond(accepted,phone,offerid,userid): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/respond/'+ offerid + '/' + userid , {accepted: accepted,phone:phone});
  }
  public interview(date,location,offerid,userid): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/interview/'+ offerid + '/' + userid , {interv_date: date,interv_location: location});
  }
  
}

