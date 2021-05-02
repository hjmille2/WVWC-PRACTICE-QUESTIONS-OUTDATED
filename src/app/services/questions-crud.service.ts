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

  fetchQuestions(filters): Observable<Question[]> {
    let requestUrl = `${this.url}/filtered`
    return this.http.get<Question[]>(requestUrl, {responseType: 'json'}).pipe(
      tap((_) => console.log('fetched filtered questions')), 
      catchError(
        this.errorHandlerService.handleError<Question[]>('fetchFiltered', [])
      )
    ); 
  }

  fetchClasses(): Observable<any[]> {
    const requestUrl = `${this.url}/classes`; 
    return this.http.get<any[]>(requestUrl, {responseType: 'json'}).pipe(
      tap((_) => console.log('fetched the classes')), 
      catchError(
        this.errorHandlerService.handleError<any[]>('fetchClasses', [])
      )
    ); 
  }

  fetchQuestionTypes():Observable<any[]>{
    const requestUrl = `${this.url}/questionTypes`; 
    return this.http.get<any[]>(requestUrl, {responseType : 'json'}).pipe(
      tap((_) => console.log('fetched the question types')), 
      catchError(
        this.errorHandlerService.handleError<any[]>('fetchQuestionTypes', [])
      )
    ); 
  }

  fetchCategories(): Observable<any[]>{
    const requestUrl = `${this.url}/categories`; 
    return this.http.get<any[]>(requestUrl, {responseType: 'json'}).pipe(
      tap( (_) => console.log('fetched categories')),
      catchError(this.errorHandlerService.handleError<any[]>('fetchedCategories', []))
    ); 
  }

  getQuestion(questionType, id): Observable<any[]>{
    const requestUrl = `${this.url}/${questionType}/${id}`; 
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

  updateQuestion(bodyData, questionType){
    const requestUrl = `${this.url}/updateQuestion/${questionType}/${bodyData.id}`
    return this.http.put(requestUrl, bodyData, this.httpOptions).pipe(
      catchError(
        this.errorHandlerService.handleError<any>('put')
      )
    ); 
  }

  deleteQuestion(questionType, id){
    const requestUrl = `${this.url}/deleteQuestion/${questionType}/${id}`; 
    return this.http.delete(requestUrl, this.httpOptions).pipe(
      catchError(
        this.errorHandlerService.handleError<any>('delete')
      )
    ); 
  }

}
