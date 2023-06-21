import { Component, OnInit } from '@angular/core';
import { admin } from 'src/app/shared/admin';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  Admin: admin;
  loginValidationMsg : string ="";

  constructor(
    private httpClient: HttpClient,
    private router : Router
  ) { }

  ngOnInit() {
  }
  public onClickLogin(namelInput: string, pwInput: string){
    this.Admin = {
      admin_id: null,
      admin_name: namelInput,
      admin_pwd: pwInput
    } 
    if(this.Admin.admin_name !="" && this.Admin.admin_pwd !="" ){
      this.login(this.Admin);
    }
    
  }
  login(admin){
    this.httpClient.post<any>('http://localhost:3000/admin', admin).subscribe(res => {
      if (res.status =="password or email incorrect"){
        this.loginValidationMsg = "The name or password is incorrect. Please retry" ;
      }else{
         localStorage.setItem('token',res.token);    
         this.router.navigate(['/dashboard']);

      }  
    })
  }
}
