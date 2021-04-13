import { Component, Input, OnInit } from '@angular/core';

import { QuestionService } from '../services/question.service'; 
import { Location } from '@angular/common'; 
import { QuestionsCrudService } from '../services/questions-crud.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question;
  questionSpecific;  
  selectedAns:string; 
  correctSelection:boolean; 

  shortAnsSubmission: string;
  showShortAns: boolean; 

  mult_choice_options = []; 

  constructor(private qService : QuestionService, private _location: Location, private questionCrudService: QuestionsCrudService) {
    this.showShortAns = false; 

    
   }

  ngOnInit(): void {
    this.question = this.getQuestion(); 
    this.questionCrudService.getQuestion(this.question.question_type, this.question.question_id).subscribe(
      value => {
        this.questionSpecific = value[0];
        if(this.question.question_type === 'mult_choice') {
          this.getMultChoiceInfo(); 
        }
      } 
    ); 
  }

  getMultChoiceInfo(){
    this.mult_choice_options.push(this.questionSpecific.correct_ans); 
    this.mult_choice_options.push(this.questionSpecific.opt_1); 
    this.mult_choice_options.push(this.questionSpecific.opt_2); 
    this.mult_choice_options.push(this.questionSpecific.opt_3); 

    //get rid of nulls
    this.mult_choice_options = this.mult_choice_options.filter(function(el) {
      return el != null; 
    }); 

    this.mult_choice_options = this.shuffleArray(this.mult_choice_options); 
  }

  //make sure the options arent always in the same order with correct ans first
  shuffleArray(array){
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array; 
  }


  getQuestion(){
    return this.qService.getQuestion(); 
  }

  getQuestionSpecific(){
    return this.qService.getQuestionSpecific(); 
  }

  multAnsSubmit(){
    if(this.selectedAns===this.questionSpecific.correct_ans){
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
