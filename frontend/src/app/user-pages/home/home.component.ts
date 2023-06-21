import { Component, OnInit } from '@angular/core';
import { offer } from '../../shared/offer';
import { Router } from '@angular/router';

import { OfferserviceService } from 'src/app/services/offerservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offers: offer[];
  

  constructor(
   private offerService: OfferserviceService,
   private router : Router
  ) { }

  ngOnInit() {
    this.offerService.getOffers().subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/login']);
        console.log(res.status);
        
      }else{
        this.offers= res;
     }
      
    });
  }

}
