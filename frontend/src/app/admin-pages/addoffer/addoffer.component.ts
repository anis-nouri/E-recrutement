import { Component, OnInit } from '@angular/core';
import { offer } from 'src/app/shared/offer';
import { OfferserviceService } from 'src/app/services/offerservice.service';

@Component({
  selector: 'app-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.scss']
})
export class AddofferComponent implements OnInit {
  Offer: offer;
  isRequired : number = 0 ;
  success : number = 0 ;

  constructor(    
    private offerservice : OfferserviceService
    ) { }

  ngOnInit() {
  }
  save(title,details, salary){
    this.Offer = {
      offer_id : null,
      offer_title:title,
      offer_details : details,
      salary : salary,
      test_id : null
    }
    if (this.Offer.offer_title != "" && this.Offer.offer_details != null  && this.Offer.salary!= null ){
      this.offerservice.addOffer(this.Offer).subscribe(res =>{
        console.log(res.status);
        this.success = 1 ;
      })
    }else {
      this.isRequired = 1 ;
    }




  }

}
