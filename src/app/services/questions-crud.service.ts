import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; 

import { Question } from '../models/question'; 
import { MultipleChoiceQuestion } from '../models/multChoiceQuestion'; 
import { ShortAnsQuestion } from '../models/shortAnsQuestions'; 

import { Observable } from 'rxjs';
import { catchError, tap} from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class QuestionsCrudService {

  private url = "http://localhost:3000/questions"; 

  constructor(private http: HttpClient) { }

  fetchAll(): Observable<Question[]> {
    return this.http
      .get<Question[]>(this.url, { responseType: 'json'})
      .pipe(
        tap((_) => console.log('fetched questions'))
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
}
