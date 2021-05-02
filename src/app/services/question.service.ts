import { Injectable } from '@angular/core';


import { MultipleChoiceQuestion } from '../models/multChoiceQuestion'; 
import { Question } from '../models/question';
import { ShortAnsQuestion } from '../models/shortAnsQuestions'; 

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  selectedQuestion : Question; 
  selectedQuestionSpecific; //will be either ShortAnsQuestion or MultipleChoiceQuestion
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


