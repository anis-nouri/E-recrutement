import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestserviceService {
  token = localStorage.getItem('token');

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTestAdmin(id): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/edittest/'+ id , { token: this.token})
  }
  public editTitle(id,title): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/edittitle/'+ id , { test_title: title})
  }
  public editQuestion(id,content): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/editquestion/'+ id , { q_content: content})
  }
  public editChoice(id,content,correct): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/editchoice/'+ id , { c_content: content, c_correct:correct})
  }
  public addQuestion(content,id): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/addquestion/'+ id , { q_content: content})
  }
  public addChoice(choice): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/addchoice/' , choice)
  }
  public deleteTest(id): Observable <any>{ 
    return this.httpClient.delete<any>('http://localhost:3000/deletetest/' + id);
  }
  public addTest(title,id): Observable <any> {
    return this.httpClient.post<any>('http://localhost:3000/addtest/'+ id , {test_title: title})
  }

}
