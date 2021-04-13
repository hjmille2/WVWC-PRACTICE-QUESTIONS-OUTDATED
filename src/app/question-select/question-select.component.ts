import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs'; 

import { Question } from '../models/question';

import { QuestionService } from '../services/question.service';
import { QuestionsCrudService } from '../services/questions-crud.service';

@Component({
  selector: 'app-question-select',
  templateUrl: './question-select.component.html',
  styleUrls: ['./question-select.component.css']
})
export class QuestionSelectComponent implements OnInit {

  questions$: Observable<Question[]>;
  selected: boolean;  

  constructor(private router : Router, private questionCrudService: QuestionsCrudService, private qService : QuestionService) { }

  ngOnInit(): void {
    this.questions$ = this.questionCrudService.fetchAll();  
  }

  openQuestion(q){
    this.qService.selectedQuestion = q;  
  }


}
