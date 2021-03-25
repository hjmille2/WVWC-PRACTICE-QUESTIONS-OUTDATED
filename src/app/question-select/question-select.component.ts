import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from '../services/question.service'

@Component({
  selector: 'app-question-select',
  templateUrl: './question-select.component.html',
  styleUrls: ['./question-select.component.css']
})
export class QuestionSelectComponent implements OnInit {

  questions = [];
  selected: boolean;  

  constructor(private qService : QuestionService, private router : Router) { }

  ngOnInit(): void {
    this.questions = this.qService.getAllQuestions(); 
  }

  openQuestion(index){
    this.qService.setIndex(index); 
    this.router.navigate(['/question']); 
  }


}
