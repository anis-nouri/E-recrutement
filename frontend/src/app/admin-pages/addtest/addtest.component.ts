import { Component, OnInit } from '@angular/core';
import { TestserviceService } from 'src/app/services/testservice.service';
import {  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-addtest',
  templateUrl: './addtest.component.html',
  styleUrls: ['./addtest.component.scss']
})
export class AddtestComponent implements OnInit {
  testTitle: string;
  titleRequiredMessage: string;
  titleSavedMessage: number = 0;
  addQcontent : string [] = [];
  addQ : number[] = [];
  id: string = this.route.snapshot.params['id'];



  constructor(
    private route: ActivatedRoute,
    private testservice: TestserviceService
  ) { }

  ngOnInit() {
  }

  saveTitle(title: string){
    if ( title != "" ){
      console.log(title);   
      this.testservice.addTest(title,this.id).subscribe(res =>{
        this.titleSavedMessage = 1;
      });
    } else {
      this.titleRequiredMessage = "Title is required";
    }
  }
  save(){
   
  }
   //Add Question 
   addQuestion(){
    this.addQ.push(1);
  }
   //Add question value
   addQuesVal(val,index){
    this.addQcontent[index] = val ;  
  }

}
