import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs'; 

import { Question } from '../models/question';
import { FiltersService } from '../services/filters.service';

import { QuestionService } from '../services/question.service';
import { QuestionsCrudService } from '../services/questions-crud.service';

@Component({
  selector: 'app-question-select',
  templateUrl: './question-select.component.html',
  styleUrls: ['./question-select.component.css']
})
export class QuestionSelectComponent implements OnInit {

  questions: any[];
  filters; 
  selected: boolean;  

  constructor(private filterService : FiltersService, private questionCrudService: QuestionsCrudService, private qService : QuestionService) { }

  ngOnInit(): void {
    this.questions = []; 
    this.filters = this.filterService.getFilters(); 
    this.questionCrudService.fetchAll().subscribe((result) => {
      result.forEach( q => {
        if(this.validQuestion(q)){
          this.questions.push(q); 
        }; 
      }) 
    });  
  }

  validQuestion(q) : boolean { 
    if(this.filters.questionType.includes(q.question_type) && this.filters.category.includes(q.category) && this.filters.class.includes(q.class)){
      return true; 
    } 
    else{
      return false; 
    }

  }

  openQuestion(q){
    this.qService.selectedQuestion = q;  
  }


}
