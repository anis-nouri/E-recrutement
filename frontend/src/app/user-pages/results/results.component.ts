import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsserviceService } from 'src/app/services/resultsservice.service';
import { OfferserviceService } from 'src/app/services/offerservice.service';
import { application } from 'src/app/shared/application';
import { offer } from 'src/app/shared/offer';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  apps : application[];
  offers: offer[];
  app_offers : offer[] =[];


  constructor(
    private router : Router,
    private resultsservice:ResultsserviceService,
    private offerService: OfferserviceService
  ) { }

  ngOnInit() {
    this.resultsservice.getResults().subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/login']);
      }else{
        this.apps = res;
        this.offerService.getOffers().subscribe(res => {
            this.offers= res;
            for (let app in this.apps ){
              this.app_offers.push(this.offers.filter(offer => offer.offer_id === this.apps[app].offer_id)[0]);

            }                     
        });        
      }
      
    });
  }

}
