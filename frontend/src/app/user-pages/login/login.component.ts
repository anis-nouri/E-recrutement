import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/shared/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : user;


  regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  mailValid : boolean;
  loginValidationMsg: string;

  constructor(
    private httpClient: HttpClient,
    private router : Router
  ) { }

  ngOnInit() {
    /*
    if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
  } else {
    localStorage.removeItem('foo') 
  }
  */
  }
  public onClickLogin(emailInput: string, pwInput: string){
    this.user = {
      user_id : null,
      user_email : emailInput,
      user_pwd : pwInput,
      user_name: "",
      user_phone: null,
      user_photo: null
    } 
    this.mailValid = this.regexp.test(this.user.user_email);
    if(this.user.user_email !="" && this.user.user_pwd !=""  && this.mailValid == true ){
      this.login(this.user);
    }
    
  }

  login(user){
    this.httpClient.post<any>(`${environment.baseUrl}/login/`, user).subscribe(res => {
      if (res.status =="password or email incorrect"){
        this.loginValidationMsg = "The email address or password is incorrect. Please retry" ;
      }else{
        this.user.user_phone = res.data[0]['user_phone'];
        this.user.user_name = res.data[0]['user_name'];
        this.user.user_id = res.data[0]['user_id'];
        this.user.user_photo = res.data[0]['user_photo'];
        const u = {"name": this.user.user_name, "phone":this.user.user_phone ,"id":this.user.user_id,"email": this.user.user_email, "photo":this.user.user_photo} 
         localStorage.setItem('token',res.token);    
         localStorage.setItem('user', JSON.stringify(u));  
         this.router.navigate(['/']);

      }  
    })
  }
  

}
