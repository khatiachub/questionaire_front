import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http:HttpClient) { }
  private url="https://localhost:7204/api/questionare_"



  registration(data: any): Observable<any> { 
    return this.http.post(`${this.url}/CreateAdmin`, data);
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.url}/LoginAdmin`, data);
  }
  addQuestion(data: any): Observable<any> {
    return this.http.post(`${this.url}/AddQuestion`, data);
  }
  getQuestions(): Observable<any> {
    return this.http.get(`${this.url}/GetQuestions`);
  }
  getQuestion(id:number): Observable<any> {
    return this.http.get(`${this.url}/GetQuestion/${id}`);
  }
  addAnswers(data: any): Observable<any> {
    return this.http.post(`${this.url}/AddAnswers`, data);
  }
  UpdateQuestion(data:any,id:number): Observable<any> {
    return this.http.put(`${this.url}/UpdateQuestions/${id}`, data);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.url}/GetUsers`);
  }
  getAnswers(id:number): Observable<any> {
    return this.http.get(`${this.url}/GetAnswers/${id}`);
  }
}
