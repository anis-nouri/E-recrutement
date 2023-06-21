import { Injectable,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.httpClient.post<any>('http://localhost:3000' , { token: this.token})
  }
  public getOffersAdmin(): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/offers' , { token: this.token})
  }

  public editOffer(offer): Observable <any>{ 
    return this.httpClient.post<any>('http://localhost:3000/editoffer' , offer);

  }
  public editReq(req): Observable <any>{ 
    return this.httpClient.post<any>('http://localhost:3000/editreq' , req);

  }
  public addRequirement(req): Observable <any>{ 
    return this.httpClient.post<any>('http://localhost:3000/addreq' , req);

  }
  public deleteRequirement(id): Observable <any>{ 
    return this.httpClient.post<any>('http://localhost:3000/deletereq' , {req_id : id});

  }
  public deleteOffer(id): Observable <any>{ 
    return this.httpClient.delete<any>('http://localhost:3000/deleteoffer/' + id);

  }
  public addOffer(offer): Observable <any>{ 
    return this.httpClient.post<any>('http://localhost:3000/addoffer',offer);
  }
  public getOffer(offerid, userid): Observable <any>{ 
    return this.httpClient.post<any>('http://localhost:3000/appdetails/'+ offerid + '/' +userid, {token: this.token});
  }
}
