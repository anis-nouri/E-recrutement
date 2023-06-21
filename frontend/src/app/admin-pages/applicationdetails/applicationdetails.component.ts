import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { OfferserviceService } from 'src/app/services/offerservice.service';
import { application } from 'src/app/shared/application';
import { ApplicationServiceService } from 'src/app/services/application-service.service';



@Component({
  selector: 'app-applicationdetails',
  templateUrl: './applicationdetails.component.html',
  styleUrls: ['./applicationdetails.component.scss']
})
export class ApplicationdetailsComponent implements OnInit {
  offerid: string = this.route.snapshot.params['offerid'];
  userid: string = this.route.snapshot.params['userid'];
  app: application[];
  answer: number = 3;
  Interview = 0 ;

  constructor(
    private route: ActivatedRoute,
    private offerservice : OfferserviceService,
    private appservice : ApplicationServiceService
  ) { }

  ngOnInit() {
    this.offerservice.getOffer(this.offerid,this.userid).subscribe(res => {
      this.app = res;
    });
  }
  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }
  onClickDownloadPdf(){
    let base64String = this.app[0]["cv"];
    this.downloadPdf(base64String,this.app[0]["user_name"]+"cv");
  }
  respond(accepted){
    this.appservice.respond(accepted,this.app[0]["user_phone"] ,this.offerid , this.userid).subscribe(res => {
      this.answer = accepted
    })
  }
  saveInterview(date,location){
    this.appservice.interview(date.replace("T"," ")+":00",location, this.offerid , this.userid).subscribe(res=>{
      this.Interview = 1;
      console.log(date.replace("T"," ")+":00");
      console.log(location);
    })
    
    
    
  }

}
