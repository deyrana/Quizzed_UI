import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { QuizService } from '../quiz/quiz.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';

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

  constructor(private route: Router, private quizService: QuizService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.headerTitle = "Home";
    this.backdrop = true;
    this.navbarMode = "over";

  }

}
