import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  filters = {
    class : [],
    category : [], 
    questionType: []
  }

  constructor() { }

  setClass(c:any[]){
    this.filters.class = c; 
  }

  setCategory(c:any[]){
    this.filters.category = c; 
  }

  setQuestionType(q:any[]){
    this.filters.questionType = q; 
  }

  getFilters(){
    return this.filters; 
  }
}
