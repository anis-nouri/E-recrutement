import { Component, OnInit } from '@angular/core';

import { offer } from '../../shared/offer';
import { application } from 'src/app/shared/application';

import {  ActivatedRoute } from '@angular/router';
import { req } from 'src/app/shared/req';
import { Router } from '@angular/router';
import { test } from 'src/app/shared/test';
import { questions } from 'src/app/shared/questions';
import { choices } from 'src/app/shared/choices';
import { user } from 'src/app/shared/user';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { OfferserviceService } from 'src/app/services/offerservice.service';
import { ApplicationServiceService } from 'src/app/services/application-service.service';





@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {



  offers: offer[];
  offer: offer;
  id: string = this.route.snapshot.params['id'];
  reqs: req[];
  token = localStorage.getItem('token');
  Test: test
  questions: questions[];
  choices: choices[];
  result: number = 0;
  form: FormGroup;
  q_note: number
  t_note: number =0;
  successtest: number = 0;
  successcv: number = 0;
  successapp: number=0;
  app: application;
  user: user ;
  exist : number = 0;


  uploadProgress:number;
  

  constructor(
    private offerservice: OfferserviceService,
    private route: ActivatedRoute,
    private router : Router,
    private appservice: ApplicationServiceService,
    private fb: FormBuilder
    ) { 
        this.form = this.fb.group({
          checkArray: this.fb.array([])
        })
      }

  ngOnInit() {
    // verif application
    const test = { "offer_id": this.id,"user_id": JSON.parse(localStorage.getItem('user'))["id"]}
    this.appservice.verifApplication(test).subscribe(res => {
      if (res.status == "application exist") {
        console.log(res.status);
        this.exist= 1 ;
      }
    });
    //get offer
    this.offerservice.getOffers().subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/login']);
      }else {
        this.offers= res;
        this.offer = res.filter(offer => offer.offer_id.toString() === this.id)[0];
      }    
    });
    //get test
    this.appservice.getTest(this.id).subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/login']);
      }else {
        this.Test =res['test'];
        this.questions = res["questions"];
        this.choices = res["choices"];
      }
    });
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
// test
  submitForm() {
    for (let question in this.questions){
      this.q_note=1;
      for (let i in this.form.value["checkArray"] ){
        if (this.questions[question]["q_id"] == this.choices[this.form.value["checkArray"][i]]["q_id"]){
          if (this.choices[this.form.value["checkArray"][i]]["c_correct"] == 0){
            this.q_note = 0;
          }
        }
        
      }
      for (let i in this.choices ){
        if (this.questions[question]["q_id"] == this.choices[i]["q_id"]){
          if(this.form.value["checkArray"].indexOf(i) == -1){
            if(this.choices[i]["c_correct"]==1){
              this.q_note = 0;
            }
          }            
        }
      }       
      this.t_note = this.t_note + this.q_note;  
    }
    this.t_note = (this.t_note * 100) / this.questions.length   
     this.successtest = 1; 
  }
  
// cv 
  
  onFileSelected(event) {
    console.log( event.target.files[0]);
    const file:File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        const type = file.type;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);      
            console.log(JSON.parse(localStorage.getItem('user'))["id"]);  
            this.successcv = 1 ;
            this.app = {
              cv :reader.result.toString().replace("data:application/pdf;base64,",""),
              accepted: null,
              interv_id: null,
              score: this.t_note,
              offer_id: parseInt(this.id),
              user_id:JSON.parse(localStorage.getItem('user'))["id"]
            }
        };      
    }    
  }
  onApply(){
    console.log(this.app);
    this.appservice.apply(this.app).subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/login']);
      }else {
        console.log(res.status);
        this.successapp = 1 ;
      }
    });
  }
}
