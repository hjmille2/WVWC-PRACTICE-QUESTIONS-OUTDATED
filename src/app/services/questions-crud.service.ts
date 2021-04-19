import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { Question } from '../models/question'; 
import { MultipleChoiceQuestion } from '../models/multChoiceQuestion'; 
import { ShortAnsQuestion } from '../models/shortAnsQuestions'; 

import { Observable } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators'; 
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionsCrudService {

  private url = "http://localhost:3000/questions"; 

  httpOptions : {headers: HttpHeaders} = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient, private errorHandlerService:ErrorHandlerService) { }

  fetchAll(): Observable<Question[]> {
    return this.http
      .get<Question[]>(this.url, { responseType: 'json'})
      .pipe(
        tap((_) => console.log('fetched questions')),
        catchError(
          this.errorHandlerService.handleError<Question[]>('fetchAll', []) 
        )
    ); 
  }

  getQuestion(questionType, id): Observable<any[]>{
    const requestUrl = `${this.url}/${questionType}/${id}`
    if(questionType === 'mult_choice'){
      return this.http
      .get<MultipleChoiceQuestion[]>(requestUrl, {responseType : 'json'})
      .pipe(
        tap((_) => console.log('fetched the question'))
      ); 
    }
    else if(questionType === 'short_ans'){
      return this.http
      .get<ShortAnsQuestion[]>(requestUrl, {responseType : 'json'})
      .pipe(
        tap((_) => console.log('fetched the question'))
      ); 
    }
  }

  postMultChoiceQuestion(bodyData){
    const requestUrl = `${this.url}/addQuestion/mult_choice`; 
    return this.http.post(requestUrl, bodyData, this.httpOptions).pipe(
      catchError(
        this.errorHandlerService.handleError<any>("post")
      )
    );

  }

  postShortAnsQuestion(bodyData){
    const requestUrl = `${this.url}/addQuestion/short_ans`; 
    return this.http.post(requestUrl, bodyData, this.httpOptions).pipe(
      catchError(
        this.errorHandlerService.handleError<any>('post')
      )
    ); 
  }

}
