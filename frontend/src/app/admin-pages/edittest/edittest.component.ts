import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { test } from 'src/app/shared/test';
import { questions } from 'src/app/shared/questions';
import { choices } from 'src/app/shared/choices';
import { TestserviceService } from 'src/app/services/testservice.service';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edittest',
  templateUrl: './edittest.component.html',
  styleUrls: ['./edittest.component.scss']
})
export class EdittestComponent implements OnInit {
  id: string = this.route.snapshot.params['id'];
  Test: test;
  questions: questions[];
  choices: choices[];
  successMessage: number = 0;
  form: FormGroup;
  addQ : number[] = [];
  addQcontent : string [] = [];
  addC : number[] = [];
  addedChoice : choices [] = []
  correctVal : number[];


  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private testservice: TestserviceService,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.testservice.getTestAdmin(this.id).subscribe(res => {
      if (res.status == "Unauthorized") {
        this.router.navigate(['/admin']);
      }else {
        this.Test =res['test'];
        this.questions = res["questions"];
        this.choices = res["choices"];
      }
    });
  }
  //save test
  save(){
    this.editCorrect();
    if ( this.Test.test_title != null){
      this.testservice.editTitle(this.id , this.Test.test_title).subscribe(res => {
      });
    }else {

    }
    for ( let i in this.questions){
      if ( this.questions[i].q_content != null ){
        this.testservice.editQuestion(this.questions[i].q_id,this.questions[i].q_content).subscribe (res =>{
        });
      }else{
      
      }
    }
    for ( let i in this.choices){
      if(this.choices[i].c_content != null ){
        this.testservice.editChoice(this.choices[i].c_id,this.choices[i].c_content,this.choices[i].c_correct).subscribe (res =>{
        });
      }  
    }
    for ( let i in this.addQ){
      this.testservice.addQuestion(this.addQcontent[i],this.id).subscribe (res =>{
      }); 
    }
    for ( let i in this.addC){
      this.testservice.addChoice(this.addedChoice[i]).subscribe(res => {

      });
    }
    this.successMessage = 1 ;
    
  }
  //get title value
  edittitleVal(val){
    this.Test.test_title = val ; 
  }

  // get questions value
  editQuesVal(val,index){
    this.questions[index].q_content = val; 
  }
  // get choices value
  editChoiceVal(val,index){
    this.choices[index].c_content = val;     
  }

//get checked 
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
    console.log(checkArray.value);  
  }
  saveDefault (index){
    this.form.value["checkArray"].push([index])
    console.log(this.form.value["checkArray"]);
    
    

  }
  //Edit the correct answer
  editCorrect(){
      for (let i in this.form.value["checkArray"] ){
        this.choices[this.form.value["checkArray"][i]]["c_correct"] = 1;       
      }
      for (let i in this.choices){
        if(this.form.value["checkArray"].indexOf(i) == -1){
          this.choices[i]["c_correct"] = 0 ;
        }
      }
  }     
  
  //Add Question 
  addQuestion(){
    this.addQ.push(1);
  }
  //Add question value
  addQuesVal(val,index){
    this.addQcontent[index] = val ;  
  }
      
   //Add Choice 
   addChoice(index){
    this.addC.push(index);
  }
  //Add Choice value
  addCoiceVal(val,index,q_id){
    this.addedChoice[index] = {
      c_id : null ,
      c_content : val ,
      c_correct : 0,
      q_id : q_id

    }
  }

  deleteTest(){
    this.testservice.deleteTest(this.id).subscribe(res => {
      console.log(res.status);
      this.router.navigate(['/offers']);
    })
  }
  



}
