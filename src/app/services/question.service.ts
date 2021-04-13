import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'; 

import { MultipleChoiceQuestion } from '../models/multChoiceQuestion'; 
import { Question } from '../models/question';
import { ShortAnsQuestion } from '../models/shortAnsQuestions'; 

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  selectedQuestion : Question; 
  selectedQuestionSpecific : Observable<any>; 
  constructor() { }

  getQuestion() {
    return this.selectedQuestion; 
  }

  getQuestionSpecific(){
    return this.selectedQuestionSpecific; 
  }
}


