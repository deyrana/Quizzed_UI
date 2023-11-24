import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../question';
import { environment } from 'src/environments/environment';
import { Answer } from '../answer';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private message = new BehaviorSubject(new Map<number, string>());
  constructor(private http: HttpClient) { }

  fetchAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(environment.restApi + 'ques');
  }

  setAnswersMap(answer: Map<number, string>) {
    this.message.next(answer);
  }

  getAnswerMap(): Observable<Map<number, string>> {
    return this.message.asObservable();
  }

  getQuestionsFromDb(qIds: number[]): Observable<Question[]> {
    let params = new HttpParams();
    params = params.append('ids', qIds.join(','));
    return this.http.get<Question[]>(environment.restApi + "ques/qids", { params: params });
  }

  getAnswersFromDb(qIds: number[]): Observable<Answer[]> {
    let params = new HttpParams();
    params = params.append('ques', qIds.join(','));
    return this.http.get<Answer[]>(environment.restApi + "ans", { params: params });
  }

  saveQuestion(quesFormData : FormData): Observable<any> {
    return this.http.post<any>(environment.restApi+"ques/addQues", quesFormData);
  }

}
