import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { QuizService } from '../quiz/quiz.service';
import { Answer } from '../answer';
import { Question } from '../question';
import { Observable, of } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-explaination',
  templateUrl: './explaination.component.html',
  styleUrls: ['./explaination.component.css']
})
export class ExplainationComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  user: User;
  pageload: boolean = false;
  quesList: number[];
  answersUser: Map<number, string>;
  answerDb: Answer[];
  answerDbMap: Map<number, string>;
  questionsDb: Question[];
  showQues: boolean[];
  quesImageUrls: Map<number, SafeUrl>;
  ansImageUrls: Map<number, SafeUrl>;

  styleObjMap: Map<string, Map<number, any>>;
  // styleObjMapObs : Observable<Map<string, Map<number, any>>>;

  constructor(private quizService: QuizService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.headerTitle = "Explaination";
    this.fetchAnsFromDB();
  }

  fetchAnsFromDB() {
    this.quesList = new Array<number>();
    this.answerDb = [];
    this.questionsDb = [];

    // Fetch Answers User has given
    this.quizService.getAnswerMap().subscribe((value) => {
      this.answersUser = value;
      this.prepareQuesList();
    });
  }

  prepareQuesList() {
    // Create a list for the question Ids which user has played
    this.answersUser.forEach((value: string, key: number) => {
      this.quesList.push(key);
    });
    this.fetchDbQuestions();
    this.fetchDbAnswers();
  }

  fetchDbQuestions() {
    this.quizService.getQuestionsFromDb(this.quesList).subscribe((value) => {
      this.questionsDb = value;
      this.showQues = new Array<boolean>(this.questionsDb.length);
      this.showQues[0] = true;
      this.initializeQuesImageUrl();

      
    });
  }

  initializeQuesImageUrl() {
    this.quesImageUrls = new Map();
    let l = this.questionsDb.length;
    for (let i = 0; i < l; i++) {
      let qu: Question = this.questionsDb[i];
      if (qu.imageName != null) {
        let url: SafeUrl = this.imageService.imageFile2URLconverter(qu.picByte, qu.imageName, qu.imageType);
        this.quesImageUrls.set(qu.qId, url);
      }
    }
  }

  fetchDbAnswers() {
    // Fetch correct answers from DB
    this.quizService.getAnswersFromDb(this.quesList).subscribe((value) => {
      this.answerDb = value;
      this.initializeAnsImageUrl();
      this.initializeOptionStyling();
    });
    this.pageload = false;

  }

  initializeAnsImageUrl() {
    this.ansImageUrls = new Map();
    let l = this.answerDb.length;
    for (let i = 0; i < l; i++) {
      let ans: Answer = this.answerDb[i];
      if (ans.imageName != null) {
        let url: SafeUrl = this.imageService.imageFile2URLconverter(ans.picByte, ans.imageName, ans.imageType);
        this.ansImageUrls.set(ans.qId, url);
      }
    }
  }

  getCompleteAnswer(qNo: number) {
    return this.answerDb.find(ans => ans.qId == qNo);
  }

  createAnswerDbMap() {
    this.answerDbMap = new Map();
    for (let i = 0; i < this.quesList.length; i++) {
      this.answerDbMap.set(this.answerDb[i].qId, this.answerDb[i].correctOption);
    }
  }

  initializeOptionStyling() {
    this.createAnswerDbMap();
    this.styleObjMap = new Map();
    this.styleObjMap.set('A', new Map());
    this.styleObjMap.set('B', new Map());
    this.styleObjMap.set('C', new Map());
    this.styleObjMap.set('D', new Map());

    this.answersUser.forEach((value: string, key: number) => {
      this.setStyleObjMap('A', true, false, false, key);
      this.setStyleObjMap('B', true, false, false, key);
      this.setStyleObjMap('C', true, false, false, key);
      this.setStyleObjMap('D', true, false, false, key);
      switch (value) {
        case 'A': {
          // correct answer
          if (this.answerDbMap.get(key) == value) {
            this.setStyleObjMap(value, false, true, false, key);
          }
          // incorrect answer
          else {
            this.setStyleObjMap(value, false, false, true, key);
            this.setStyleObjMap(this.answerDbMap.get(key), false, true, false, key);
          }
          break;
        }
        case 'B': {
          // correct answer
          if (this.answerDbMap.get(key) == value) {
            this.setStyleObjMap(value, false, true, false, key);
          }
          // incorrect answer
          else {
            this.setStyleObjMap(value, false, false, true, key);
            this.setStyleObjMap(this.answerDbMap.get(key), false, true, false, key);
          }
          break;
        }
        case 'C': {
          // correct answer
          if (this.answerDbMap.get(key) == value) {
            this.setStyleObjMap(value, false, true, false, key);
          }
          // incorrect answer
          else {
            this.setStyleObjMap(value, false, false, true, key);
            this.setStyleObjMap(this.answerDbMap.get(key), false, true, false, key);
          }
          break;
        }
        case 'D': {
          // correct answer
          if (this.answerDbMap.get(key) == value) {
            this.setStyleObjMap(value, false, true, false, key);
          }
          // incorrect answer
          else {
            this.setStyleObjMap(value, false, false, true, key);
            this.setStyleObjMap(this.answerDbMap.get(key), false, true, false, key);
          }
          break;
        }
        default: {
          this.setStyleObjMap(this.answerDbMap.get(key), false, true, false, key);
        }
      }
    });

    console.log(this.answersUser);
    console.log(this.answerDbMap);
    console.log(this.styleObjMap);

  }

  setStyleObjMap(key: string, optnFlg: boolean, correctFlg: boolean, wrongFlg: boolean, qId: number) {

    if (this.styleObjMap.has(key)) {
      this.styleObjMap.set(key, this.styleObjMap.get(key).set(qId, {
        "options-btn": optnFlg,
        "correct-option": correctFlg,
        "wrong-option": wrongFlg
      }));
    } else {
      let map: Map<number, any> = new Map();
      map.set(qId, {
        "options-btn": optnFlg,
        "correct-option": correctFlg,
        "wrong-option": wrongFlg
      });
      this.styleObjMap.set(key, map);
    }

  }

  getStyleOption(qId: number, option: string) {
    return this.styleObjMap.get(option).get(qId);
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
    return this.questionsDb.length == (index + 1);
  }

  disablePrev(index) {
    return index == 0;
  }

}
