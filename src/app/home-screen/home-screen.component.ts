import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FiltersService } from '../services/filters.service';
import { QuestionsCrudService } from '../services/questions-crud.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  filters;  
  constructor(private router : Router, private filterService : FiltersService, private questionCrudService:QuestionsCrudService) { 
  }

  ngOnInit(): void {
    this.filters = {
      classes : [],
      category: [],
      questionType : []
    }; 

      // get all classes
     this.questionCrudService.fetchClasses().subscribe((result => {
       result.forEach((c) => {
          this.filters.classes.push(
            {
              className : c.class,
              isSelected : true
            }
          )
       }); 
     })); 

     this.questionCrudService.fetchQuestionTypes().subscribe((result => {
       result.forEach(q => {
         // make these more readable 
         this.filters.questionType.push(
           {
             questionType : q.question_type === 'short_ans' ? 'Short Answer' : 'Multiple Choice',
             isSelected : true
           }
         )
       }); 
     })); 

     this.questionCrudService.fetchCategories().subscribe((result => {
       result.forEach(c => {
         this.filters.category.push(
           {
             category : c.category,
             isSelected : true
           }
         )
       }); 
     })); 

  }

  questionRequest(){
     let tempCategory = []; 
     this.filters.category.forEach((c) => {
       if(c.isSelected){
        tempCategory.push(c.category); 
       }
     }); 
     
     let tempClass = []; 
     this.filters.classes.forEach((c)=>{
       if(c.isSelected){
         tempClass.push(c.className); 
       }
     }); 

     let tempQuestionType = []; 
     this.filters.questionType.forEach((q) => {
       if(q.isSelected){
         if(q.questionType === 'Multiple Choice'){
           tempQuestionType.push('mult_choice')
         } 
         else{
           tempQuestionType.push('short_ans')
         }
       }
     }); 

     this.filterService.setCategory(tempCategory); 
     this.filterService.setClass(tempClass); 
     this.filterService.setQuestionType(tempQuestionType); 

     this.router.navigateByUrl('/questions');  

  }


}
