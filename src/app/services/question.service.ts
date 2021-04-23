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
  selectedQuestionSpecific; 
  constructor() { }

  getQuestion() {
    return this.selectedQuestion; 
  }

  getQuestionSpecific(){
    return this.selectedQuestionSpecific; 
  }

  setSelectedQuestion(q){
    this.selectedQuestion = q; 
  }

  setSelectedQuestionSpecific(q){
    this.selectedQuestionSpecific = q; 
  }
}


