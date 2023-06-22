import { Injectable,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OfferserviceService implements OnInit {
  token = localStorage.getItem('token');


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {  
  }
//get offers
  public getOffers(): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}`, { token: this.token})
  }
  public getOffersAdmin(): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/offers` , { token: this.token})
  }

  public editOffer(offer): Observable <any>{ 
    return this.httpClient.post<any>(`${environment.baseUrl}/editoffer` , offer);

  }
  public editReq(req): Observable <any>{ 
    return this.httpClient.post<any>(`${environment.baseUrl}/editreq` , req);

  }
  public addRequirement(req): Observable <any>{ 
    return this.httpClient.post<any>(`${environment.baseUrl}/addreq` , req);

  }
  public deleteRequirement(id): Observable <any>{ 
    return this.httpClient.post<any>(`${environment.baseUrl}/deletereq` , {req_id : id});

  }
  public deleteOffer(id): Observable <any>{ 
    return this.httpClient.delete<any>(`${environment.baseUrl}/deleteoffer/` + id);

  }
  public addOffer(offer): Observable <any>{ 
    return this.httpClient.post<any>(`${environment.baseUrl}/addoffer`,offer);
  }
  public getOffer(offerid, userid): Observable <any>{ 
    return this.httpClient.post<any>(`${environment.baseUrl}/appdetails/`+ offerid + '/' +userid, {token: this.token});
  }
}
