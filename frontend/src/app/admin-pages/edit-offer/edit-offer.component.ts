import { Component, OnInit } from '@angular/core';
import { offer } from '../../shared/offer';
import { OfferserviceService } from 'src/app/services/offerservice.service';
import {  ActivatedRoute } from '@angular/router';
import { req } from 'src/app/shared/req';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {

  offers: offer[];
  offer: offer;
  id: string = this.route.snapshot.params['id'];

  reqs: req[];
  Req:req 
  token = localStorage.getItem('token');
  edit: number = 0;
  saveOf : number = 0 ;
  saveR : number[] = [] ;
  addR:number[]=[];
  saveAddReq: number[]=[];
  messageOfferEmpty: string;
  messageReqEmpty : string
  deleteR : number = 0;

  constructor(
    private offerservice: OfferserviceService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router : Router,
  ) { }

  ngOnInit() {
    
    this.offerservice.getOffersAdmin().subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/admin']);
      }else {
        this.offers= res;
        this.offer = res.filter(offer => offer.offer_id.toString() === this.id)[0];
        //-------
        this.getReq(); 
      }    
    });
    
   
  }
  public getReq() {
      this.httpClient.post<req[]>('http://localhost:3000/editoffer/'+this.id, { token: this.token} ).subscribe (
        Response =>{
          this.reqs = Response;  
        }
      );
  }
  public editOffer(){
    this.edit = 1 ;
  }
  public saveOffer(title : string, details:Text , salary: number){
    this.offer.offer_title= title;
    this.offer.offer_details = details;
    this.offer.salary = salary ;
    if (this.offer.offer_title != "" && this.offer.offer_details != null  && this.offer.salary!= null ){
      this.offerservice.editOffer(this.offer).subscribe(res =>{
        console.log(res.status);
        this.saveOf = 1; 
       
      })

    }else{
      this.messageOfferEmpty = "Title, details and salary are required ! " ;

    }
   
  }
  public saveReq(title: string, req:string, id :number){
    this.Req = {
      req_id : id,
      req_title : title,
      requirement : req,
      offer_id: null
    }    
    if ( this.Req.req_title != "" && this.Req.requirement != ""){
      this.offerservice.editReq(this.Req).subscribe(res =>{
        console.log(res.status);
        this.saveR.push(1);    
      })
    }else {
      this.messageReqEmpty = "Title and requirement are required ! "
    }
    
  }
  addReq(){
    this.addR.push(1);
  }
  saveaddReq(title:string, req:string){
    this.Req={
      req_id : null,
      req_title : title,
      requirement : req,
      offer_id: parseInt(this.id)
    }   
    if ( this.Req.req_title != "" && this.Req.requirement != ""){
      this.offerservice.addRequirement(this.Req).subscribe(res =>{
        console.log(res.status);
        this.saveAddReq.push(1);
      })
    }else {
      this.messageReqEmpty = "Title and requirement are required ! "
    }  
  }
  deleteReq(id: number){
    this.offerservice.deleteRequirement(id).subscribe(res => {
      let index = this.reqs.findIndex(reqs => reqs.req_id === id); //find index in your array
        this.reqs.splice(index, 1);//remove element from array
    });
    event.stopPropagation();
  }
  deleteOff(){
    this.offerservice.deleteOffer(this.id).subscribe(res => {
      console.log(res.status);
      this.router.navigate(['/offers']);
    })
  }
     

}
