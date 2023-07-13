import { Injectable } from '@angular/core';
import  Amplify,{Auth} from 'aws-amplify'
import { environment } from 'src/environments/environment';
import { user } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() { 
    Amplify.configure({
      Auth:environment.cognito
    })
  }

  public signup(User : user) :Promise<any>{
    return Auth.signUp({
      username : User.user_email,
      password : User.user_pwd,
      attributes : {
        email : User.user_email,
        name : User.user_name,
        phone : User.user_phone
      }
    })
  }

  public confirmSignUp(User : user, code:string) :Promise<any>{
    return Auth.confirmSignUp(User.user_email,code);

  }

}
