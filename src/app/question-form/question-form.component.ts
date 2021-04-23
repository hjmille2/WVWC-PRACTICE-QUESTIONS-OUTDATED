import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { QuestionsCrudService } from '../services/questions-crud.service';
import { MultipleChoiceQuestion} from '../models/multChoiceQuestion'; 
import { Question } from '../models/question';
import { ShortAnsQuestion } from '../models/shortAnsQuestions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questionType:string;

  multChoiceForm: FormGroup; 
  multChoiceOptions: FormArray; 

  shortAnsForm : FormGroup; 

  constructor(private formBuilder: FormBuilder, private questionsCrudService : QuestionsCrudService, private route: Router) { 
 
    this.createMultChoiceForm(); 
    this.createShortAnsForm(); 
  }

  ngOnInit(): void {
  }

  createMultChoiceForm() {
    this.multChoiceForm = this.formBuilder.group({
      multChoiceClass: [''],
      multChoiceCategory: [''],
      multChoiceQuestion: [''],
      correctAns: [''],
      multChoiceOptions: this.formBuilder.array([this.newOption()]),
      multChoiceExplanation: ['']
    }); 
 
  }

  options() : FormArray {
    return this.multChoiceForm.get('multChoiceOptions') as FormArray ; 
  }

  newOption(): FormGroup {
    return this.formBuilder.group({
      opt : ''
    }); 
  }

  addOption(){
    this.options().push(this.newOption()); 

  }

  removeOption(i:number){
    this.options().removeAt(i); 
 
  }

  createShortAnsForm(){
    this.shortAnsForm = this.formBuilder.group({
      shortAnsClass: [''],
      shortAnsCategory: [''],
      shortAnsQuestion: [''],
      shortAnsAnswer: [''],
      shortAnsExplanation: [''] 
    }); 
  }

  setQuestionType(event){
    this.questionType = event.value;
  }


  submitMultChoiceForm(){
    let q : Partial<Question> = {
      question_type : 'mult_choice', 
      question : this.multChoiceForm.get('multChoiceQuestion').value, 
      category : this.multChoiceForm.get('multChoiceCategory').value,
      class : this.multChoiceForm.get('multChoiceClass').value
    }

    let m : Partial<MultipleChoiceQuestion> = {
      correct_ans : this.multChoiceForm.get('correctAns').value,
      opt_1 : this.multChoiceForm.get('multChoiceOptions').value[0].opt,
      opt_2 : this.isUndefined(this.multChoiceForm.get('multChoiceOptions').value[1]) ? null : this.multChoiceForm.get('multChoiceOptions').value[1].opt,
      opt_3 : this.isUndefined(this.multChoiceForm.get('multChoiceOptions').value[2]) ? null : this.multChoiceForm.get('multChoiceOptions').value[2].opt,
      explanation : this.multChoiceForm.get('multChoiceExplanation').value

    } 

    let bodyData = {...q, ...m} //combine both objects to send as json data to express server
    this.questionsCrudService.postMultChoiceQuestion(bodyData).subscribe((result) =>{
      console.log(result); 
      this.route.navigateByUrl('/')
    }); 
     
  }

  isUndefined(test){
    return test === undefined; 
  }

  submitShortAnsForm(){
    let q : Partial<Question> = {
      question_type: 'short_ans',
      question: this.shortAnsForm.get('shortAnsQuestion').value,
      category: this.shortAnsForm.get('shortAnsCategory').value,
      class: this.shortAnsForm.get('shortAnsClass').value
    }

    let a : Partial<ShortAnsQuestion> = {
      answer: this.shortAnsForm.get('shortAnsAnswer').value,
      explanation: this.shortAnsForm.get('shortAnsExplanation').value
    }

    let bodyData = {...q, ...a}; //put into one object to pass to body of call
    this.questionsCrudService.postShortAnsQuestion(bodyData).subscribe((result) =>{
      console.log(result); 
      this.route.navigateByUrl('/')
    }); // have to subscribe to make call

  }

}
