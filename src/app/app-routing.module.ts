import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { ExplainationComponent } from './explaination/explaination.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'explain', component: ExplainationComponent },
  { path: 'add_ques', component: AddQuestionsComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
