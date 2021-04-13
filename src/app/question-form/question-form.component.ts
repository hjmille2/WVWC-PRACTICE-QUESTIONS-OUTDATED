import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questionType:string;

  multChoiceForm: FormGroup; 

  constructor(private formBuilder: FormBuilder) { 
 
    this.createMultChoiceForm(); 
  }

  ngOnInit(): void {
  }

  createMultChoiceForm() {
    this.multChoiceForm = this.formBuilder.group({
      question: '',
      correctAns: '',
      options: this.formBuilder.array([]),
      explanation: ''
    }); 

    this.addOption(); 
  }

  options() : FormArray {
    return this.multChoiceForm.get('options') as FormArray ; 
  }

  newOption(): FormGroup {
    return this.formBuilder.group({
      optString : ''
    }); 
  }

  addOption(){
    this.options().push(this.newOption()); 

  }

  removeOption(i:number){
    this.options().removeAt(i); 
 
  }

  setQuestionType(event){
    this.questionType = event.value;
  }



}
