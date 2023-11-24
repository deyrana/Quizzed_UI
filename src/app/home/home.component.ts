import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { QuizService } from '../quiz/quiz.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  user: User;
  quizUrl: string;
  addQuesUrl: string
  rules: string[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.headerTitle = "Home";
    this.backdrop = true;
    this.navbarMode = "over";
    this.quizUrl = "/quiz";
    this.addQuesUrl = "/add_ques";

    this.rules = ["A question with 4 options will be displayed",
      "Only one of the options is correct",
      "Some questions are image based, i.e, questions pertaining to the image is being asked",
      "Each correct Answer fetches the user +300 points",
      "Each incorrect Answer fetches the user -100 points",
      "Each unanswered question fetches the user 0 points",
      "You have the option to submit the quiz anytime you want"];


  }



  navigateToPlayQuiz() {
    this.router.navigate(['/quiz']);
  }

  navigateToAddQues() {
    this.router.navigate(['/add_ques']);
  }

}

