import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  index: number; 
  questions = [
    {id: 1, question: 'this is true', correct_ans:'true', opt_1:'false', opt_2: null, opt_3: null, explanation: null, question_type: 'mult_choice'}, 
    {id: 2, question: 'yolo', correct_ans:'hi', explanation: null, question_type: 'short_ans'}
  ]
  constructor() { }

  getQuestion(){
    return this.questions[this.index]; 
  }

  setIndex(i){
    this.index = i;  
  }

  getAllQuestions(){
    return this.questions; 
  }
}


