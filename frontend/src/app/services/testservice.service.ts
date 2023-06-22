import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class TestserviceService {
  token = localStorage.getItem('token');

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTestAdmin(id): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/edittest/`+ id , { token: this.token})
  }
  public editTitle(id,title): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/edittitle/`+ id , { test_title: title})
  }
  public editQuestion(id,content): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/editquestion/`+ id , { q_content: content})
  }
  public editChoice(id,content,correct): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/editchoice/`+ id , { c_content: content, c_correct:correct})
  }
  public addQuestion(content,id): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/addquestion/`+ id , { q_content: content})
  }
  public addChoice(choice): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/addchoice/` , choice)
  }
  public deleteTest(id): Observable <any>{ 
    return this.httpClient.delete<any>(`${environment.baseUrl}/deletetest/` + id);
  }
  public addTest(title,id): Observable <any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/addtest/`+ id , {test_title: title})
  }

}
