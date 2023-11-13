import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  headerTitle: string;

  constructor() { }

  ngOnInit(): void {
    this.headerTitle = "Add Questions";
  }

}
