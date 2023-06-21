import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from 'src/app/shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string;
  phone:number;
  email: string;
  image: string;

  edit : number = 0 ;
  regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  mailValid : boolean;
  userCheck: string;
  user : user;

  save: number = 0;


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem('user'))["name"];
    this.phone = JSON.parse(localStorage.getItem('user'))["phone"];
    this.email = JSON.parse(localStorage.getItem('user'))["email"];
    this.image ="data:image/png;base64," + JSON.parse(localStorage.getItem('user'))["photo"];
    console.log(this.image);
    
  }
  onEdit(){
    this.edit = 1;
  }

  public onSave(emailInput: string, pwInput: string, nameInput: string, phoneInput: number){
    this.user = {
      user_id : JSON.parse(localStorage.getItem('user'))["id"],
      user_email : emailInput,
      user_pwd : pwInput,
      user_name : nameInput,
      user_phone: phoneInput,
      user_photo: this.image
    } 
    this.mailValid = this.regexp.test(this.user.user_email);
    if(this.user.user_email !="" && this.user.user_name != "" && this.user.user_pwd !=""  && this.user.user_phone.toString() != "" && this.mailValid == true ){
      console.log(this.user.user_id); 
      this.register(this.user);
    }
    
  }

  register(user){
    this.httpClient.post<any>('http://localhost:3000/editprofile', user).subscribe(res => {
      console.log(res.status);
      if (res.status =="email exist"){
        this.userCheck = "Email adress already exists !" ;
      }else{
        const u = {"name": this.user.user_name, "phone":this.user.user_phone ,"id":this.user.user_id,"email": this.user.user_email, "photo":this.user.user_photo} 
         localStorage.setItem('user', JSON.stringify(u)); 
         this.save = 1;
         this.edit = 0;
      }  
    })
  }

  onFileSelected(event) {
    console.log( event.target.files[0]);
    const file:File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        const type = file.type;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
             this.image = reader.result.toString().replace("data:image/png;base64,","");  
             console.log(this.image);
               
        };      
    }    
  }

}
