import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';

import { QuestionSelectComponent } from './question-select/question-select.component';
import { QuestionComponent } from './question/question.component';


const routes: Routes = [
  {path: 'questions', component: QuestionSelectComponent},
  {path: 'home', component: HomeScreenComponent},
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path: 'question', component: QuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
