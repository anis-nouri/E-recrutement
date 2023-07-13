import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/shared/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CognitoService } from 'src/app/services/cognito.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user : user;

  //added 
  isConfirm:boolean =false;
  alertMessage:string='';
  showAlert:boolean=false;



  regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  mailValid : boolean;
  userCheck: string;



  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private cognitoService : CognitoService
    ) { }

  ngOnInit() { 
    this.user ={} as user;
    this.isConfirm= false;
  }

  public signupWithCognito(emailInput: string, pwInput: string, nameInput: string, phoneInput: number){
    this.user = {
      user_id : null,
      user_email : emailInput,
      user_pwd : pwInput,
      user_name : nameInput,
      user_phone: phoneInput,
      user_photo: null
    } 
    if(this.user && this.user.user_email && this.user.user_pwd){
      this.cognitoService.signup(this.user)
      .then(()=> {
        this.isConfirm=true;
      })
      .catch((error:any)=> {
        this.displayAlert(error.message)
      })
    }
    else {
      this.displayAlert("Missing email or password");
    }
  }

  public confirmSignup(codeInput: string){
    if(this.user){
      this.cognitoService.confirmSignUp(this.user,codeInput)
      .then(() => {
        this.router.navigate(['/login'])
      })
      .catch((error:any) => {
        this.displayAlert(error.meessage);
      })
    }
    else{
      this.displayAlert("Missing user information");
    }
  }

  private displayAlert(message:string){
    this.alertMessage=message;
    this.showAlert=true;
  }



  public signup(emailInput: string, pwInput: string, nameInput: string, phoneInput: number){
    this.user = {
      user_id : null,
      user_email : emailInput,
      user_pwd : pwInput,
      user_name : nameInput,
      user_phone: phoneInput,
      user_photo: null
    } 
    this.mailValid = this.regexp.test(this.user.user_email);
    if(this.user.user_email !="" && this.user.user_name != "" && this.user.user_pwd !=""  && this.user.user_phone.toString() != "" && this.mailValid == true ){
      this.register(this.user);
    }
    
  }

  register(user){
    this.httpClient.post<any>(`${environment.baseUrl}/signup`, user).subscribe(res => {
      console.log(res.status);
      if (res.status =="email exist"){
        this.userCheck = "Email adress already exists !" ;
      }else{
        const u = {"name": this.user.user_name, "phone":this.user.user_phone ,"id":this.user.user_id,"email": this.user.user_email, "photo":this.user.user_photo} 
        localStorage.clear();
         localStorage.setItem('token',res.token);
         localStorage.setItem('user', JSON.stringify(u)); 
         this.router.navigate(['/']);

      }  
    })
  }
  
  
  
}
