import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { QuestionsCrudService } from '../services/questions-crud.service'; 
import { QuestionService } from '../services/question.service'

import { Question } from '../models/question'; 
import { MultipleChoiceQuestion } from '../models/multChoiceQuestion';
import { ShortAnsQuestion } from '../models/shortAnsQuestions';  

import { Router } from '@angular/router';




@Component({
  selector: 'app-edit-question-form',
  templateUrl: './edit-question-form.component.html',
  styleUrls: ['./edit-question-form.component.css']
})
export class EditQuestionFormComponent implements OnInit {

  selectedQuestion: Question; 
  selectedQuestionSpecific; 
  questionType: string; 

  multChoiceForm: FormGroup; 
  multChoiceOptions: FormArray;

  shortAnsForm: FormGroup; 

  openModel: boolean; 

  constructor(private formBuilder: FormBuilder, 
    private questionsCrudService: QuestionsCrudService, 
    private qService : QuestionService, 
    private route : Router,) {
    this.selectedQuestion = qService.getQuestion(); 
    this.selectedQuestionSpecific = qService.getQuestionSpecific(); 
    this.questionType = this.selectedQuestion.question_type; 

    console.log(this.selectedQuestion); 
    
    this.createMultChoiceForm(); 
    this.createShortAnsForm(); 
  }

  ngOnInit(): void {
  }

  createMultChoiceForm(){
    this.multChoiceForm = this.formBuilder.group({
      multChoiceClass: [this.selectedQuestion.class],
      multChoiceCategory: [this.selectedQuestion.category],
      multChoiceQuestion: [this.selectedQuestion.question],
      correctAns: [this.selectedQuestionSpecific.correct_ans],
      multChoiceOptions: this.formBuilder.array([]),
      multChoiceExplanation: [this.selectedQuestionSpecific.explanation]
    }); 

    this.getOptions(); 
  }

  getOptions(){
    console.log(this.options().value)

    if(this.selectedQuestionSpecific.opt_1 != null){
      this.options().push(
        this.formBuilder.group({
          opt : [this.selectedQuestionSpecific.opt_1]
        })
      ); 
    }
    
    if(this.selectedQuestionSpecific.opt_2 != null){
      this.options().push(
        this.formBuilder.group({
          opt: [this.selectedQuestionSpecific.opt_2]
        })
      ); 
    } 

    if(this.selectedQuestionSpecific.opt_3 != null){
      this.options().push(
        this.formBuilder.group({
          opt : [this.selectedQuestionSpecific.opt_3]
        })
      ); 
    }

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
      shortAnsClass: [this.selectedQuestion.class],
      shortAnsCategory: [this.selectedQuestion.category],
      shortAnsQuestion: [this.selectedQuestion.question],
      shortAnsAnswer: [this.selectedQuestionSpecific.answer],
      shortAnsExplanation: [this.selectedQuestionSpecific.explanation] 
    }); 
  }

  submitShortAnsForm(){
    let bodyData = {
      id : this.selectedQuestion.question_id,
      question_type: 'short_ans',
      question: this.shortAnsForm.get('shortAnsQuestion').value,
      category: this.shortAnsForm.get('shortAnsCategory').value,
      class: this.shortAnsForm.get('shortAnsClass').value,
      answer: this.shortAnsForm.get('shortAnsAnswer').value,
      explanation: this.shortAnsForm.get('shortAnsExplanation').value
    }

    this.questionsCrudService.updateQuestion(bodyData, 'short_ans').subscribe((result)=>{
      console.log(result); 
      this.route.navigateByUrl('/question'); 
    }); 
  }

  submitMultChoiceForm(){
    let bodyData = {
      id : this.selectedQuestion.question_id,
      question : this.multChoiceForm.get('multChoiceQuestion').value, 
      category : this.multChoiceForm.get('multChoiceCategory').value,
      class : this.multChoiceForm.get('multChoiceClass').value,
      correct_ans : this.multChoiceForm.get('correctAns').value,
      opt_1 : this.multChoiceForm.get('multChoiceOptions').value[0].opt,
      opt_2 : this.isUndefined(this.multChoiceForm.get('multChoiceOptions').value[1]) ? null : this.multChoiceForm.get('multChoiceOptions').value[1].opt,
      opt_3 : this.isUndefined(this.multChoiceForm.get('multChoiceOptions').value[2]) ? null : this.multChoiceForm.get('multChoiceOptions').value[2].opt,
      explanation : this.multChoiceForm.get('multChoiceExplanation').value
    }; 

    this.questionsCrudService.updateQuestion(bodyData, 'mult_choice').subscribe((result)=>{
      console.log(result); 
      this.route.navigateByUrl('/question'); 
    }); 
  }

  isUndefined(test){
    return test === undefined; 
  }

  deleteQuestion(){
    if(confirm("Are you sure you want to permanently delete this question?")){
      this.questionsCrudService.deleteQuestion(this.selectedQuestion.question_type, this.selectedQuestion.question_id).subscribe((result)=>{
        console.log(result);  
        this.route.navigateByUrl('/questions')
      }); 
    }

  }

}
