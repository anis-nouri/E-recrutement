import { Component, OnInit } from '@angular/core';
import { offer } from '../../shared/offer';
import { Router } from '@angular/router';

import { OfferserviceService } from 'src/app/services/offerservice.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offers: offer[];
  


  constructor(
    private offerService: OfferserviceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.offerService.getOffersAdmin().subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/admin']);
      }else{
        this.offers= res;
     } 
    });
  }

}
