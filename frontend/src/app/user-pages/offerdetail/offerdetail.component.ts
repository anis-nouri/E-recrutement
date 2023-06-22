import { Component, OnInit } from '@angular/core';
import { offer } from '../../shared/offer';
import { OfferserviceService } from 'src/app/services/offerservice.service';
import {  ActivatedRoute } from '@angular/router';
import { req } from 'src/app/shared/req';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';




@Component({
  selector: 'app-offerdetail',
  templateUrl: './offerdetail.component.html',
  styleUrls: ['./offerdetail.component.scss']
})
export class OfferdetailComponent implements OnInit {
  
  offers: offer[];
  offer: offer;
  id: string = this.route.snapshot.params['id'];

  reqs: req[];
  token = localStorage.getItem('token');

  constructor(private offerservice: OfferserviceService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router : Router,
    ) { }

  ngOnInit() {
    
    this.offerservice.getOffers().subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/login']);
      }else {
        this.offers= res;
        this.offer = res.filter(offer => offer.offer_id.toString() === this.id)[0];
        //-------
        this.getReq(); 
      }    
    });
    
   
  }
  public getReq() {
      this.httpClient.post<req[]>(`${environment.baseUrl}/offerdetail/`+this.id, { token: this.token} ).subscribe (
        Response =>{
          this.reqs = Response;  
        }
      );
  }
      

}
