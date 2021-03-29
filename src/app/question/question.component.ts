import { Component, Input, OnInit } from '@angular/core';

import { QuestionService } from '../services/question.service'; 
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question; 
  questionType: string;
  selectedAns:string; 
  correctSelection:boolean; 

  shortAnsSubmission: string;
  showShortAns: boolean; 

  mult_choice_options; 

  constructor(private qService : QuestionService, private _location: Location) {
    this.showShortAns = false; 
   }

  ngOnInit(): void {
    this.question = this.getQuestion();  
    this.questionType = this.question.question_type; 
    console.log(this.question); 
    if(this.questionType === 'mult_choice'){
      this.getMultChoiceInfo(); 
    }
  }

  getMultChoiceInfo(){
    let mult_options = [
      this.question.correct_ans, this.question.opt_1, this.question.opt_2, this.question.opt_3
    ]; 

    mult_options = mult_options.filter(function(e1){
      return e1 != null; 
    }); 

    this.mult_choice_options = mult_options; 
    
  }

  getQuestion(){
    return this.qService.getQuestion(); 
  }

  multAnsSubmit(){
    if(this.selectedAns===this.question.correct_ans){
      this.correctSelection = true; 
    }
    else{
      this.correctSelection = false; 
    }
  }

  shortAnsSubmit(){
    this.showShortAns = !this.showShortAns;   
  }

  backClicked(){
    this._location.back(); 
  }

}
