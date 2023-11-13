import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user/user';
import { Question } from '../question';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  user: User;
  pageload: boolean;
  questions: Question[];
  showQues: boolean[];
  answers: Map<number, string>;
  totalQues: number;

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {

    this.pageload = true;
    this.headerTitle = "Play Quiz";
    this.quizService.fetchAllQuestions().subscribe(
      response => {
        this.questions = response;
        this.showQues = new Array<boolean>(this.questions.length);
        this.totalQues = this.questions.length;
        this.showQues[0] = true;
        this.initializeAnswerMap();
      }
    );

    this.pageload = false;
  }

  initializeAnswerMap() {
    this.answers = new Map<number, string>();
    for (let i = 0; i < this.questions.length; i++) {
      this.answers.set(this.questions[i].qId, "");
    }
  }

  nextQues(index) {
    this.showQues[index] = false;
    this.showQues[index + 1] = true;
  }

  prevQues(index) {
    this.showQues[index] = false;
    this.showQues[index - 1] = true;
  }

  canShow(index) {
    return this.showQues[index];

  }

  disableNext(index) {
    return this.questions.length == (index + 1);
  }

  disablePrev(index) {
    return index == 0;
  }

  ansSelected(index: number, option: string, qId: number) {
    this.answers.set(qId, option);
    // console.log(this.answers);
    if (index + 1 < this.questions.length) {
      this.showQues[index] = false;
      this.showQues[index + 1] = true;
    }

  }

  submitQuiz() {
    this.quizService.setAnswersMap(this.answers);
    this.router.navigate(['/result']);
  }


}
