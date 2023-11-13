import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { QuizService } from '../quiz/quiz.service';
import { UserService } from '../user/user.service';
import { Answer } from '../answer';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  user: User;
  imgUrl: string;
  username: string;
  userid: number;
  pageload: boolean;
  answersUser: Map<number, string>;
  answerDb: Answer[];
  quesList: number[];
  correctAns: number;
  incorrectAns: number;
  unanswered: number;
  accuracy: number;
  finalScore: number;

  constructor(private actRoute: ActivatedRoute, private router: Router, private quizService: QuizService, private userService: UserService) { }

  ngOnInit(): void {
    this.pageload = true;
    this.headerTitle = "Result";
    this.answerDb = [];

    this.fetchAnsFromDB();
    this.fetchUser();


  }

  fetchAnsFromDB() {
    this.quesList = new Array<number>();

    // Fetch Answers User has given
    this.quizService.getAnswerMap().subscribe((value) => {
      this.answersUser = value;
      this.createQuesList();
    });





  }

  createQuesList() {
    // Create a list for the question Ids which user has played
    this.answersUser.forEach((value: string, key: number) => {
      this.quesList.push(key);
    });

    this.fetchDbAnswers();
  }

  fetchDbAnswers() {
    // Fetch correct answers from DB
    this.quizService.getAnswersFromDb(this.quesList).subscribe((value) => {
      this.answerDb = value;
      this.calculateScore();
    });
  }

  fetchUser() {
    this.username = localStorage.getItem('token');
    this.userService.getUserData(this.username).subscribe((response) => {
      if (response.image != null) {
        this.imgUrl = response.image
      }
      this.userid = response.userId;
    })
  }

  calculateScore() {
    this.correctAns = 0, this.incorrectAns = 0, this.unanswered = 0;

    this.answersUser.forEach((value: string, key: number) => {
      if (value === "") {
        this.unanswered = this.unanswered + 1;
      } else {

        let answer: Answer = new Answer();
        for (let i = 0; i < this.answerDb.length; i++) {
          if (this.answerDb[i].qId == key) {
            answer = this.answerDb[i];
            break;
          }
        }

        if (answer.correctOption === value) {
          this.correctAns = this.correctAns + 1;
        } else {
          this.incorrectAns = this.incorrectAns + 1
        }
      }
    });

    this.accuracy = (this.correctAns * 100) / (this.correctAns + this.incorrectAns);
    this.finalScore = (this.correctAns * 300) - (this.incorrectAns * 100);
  }

  goToExplaination() {
    this.router.navigate(['/explain']);
  }

}
