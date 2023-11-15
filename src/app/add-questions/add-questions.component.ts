import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../quiz/quiz.service';
import { QuestionDto } from '../questionDto';
import { AnswerDto } from '../answerDto';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  AddQuesForm: FormGroup;
  headerTitle: string;
  qfile: File;
  qurl: any;
  afile: File;
  aurl: any;
  ques: QuestionDto;
  ans: AnswerDto;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private sanitizer: DomSanitizer, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.headerTitle = "Add Questions";

    this.AddQuesForm = this.formBuilder.group({
      ques: [null, Validators.required],
      optionA: [null, Validators.required],
      optionB: [null, Validators.required],
      optionC: [null, Validators.required],
      optionD: [null, Validators.required],
      genre: [null],
      correctOption: [null, Validators.required],
      ansExplaination: [null],
    });
  }

  submit() {
    console.log("Submit button");
    if (this.AddQuesForm.valid) {
      let formData: FormData = this.prepareFormData();
      this.quizService.saveQuestion(formData).subscribe((response) => {
        console.log(response);
        if (response) {
          let title: string = "Success";
          let content: string = "Question Saved Successfully!";
          let url: string = "/home";
          let primeBtn: string = "Close";
          let secBtn: string = "Go to Home";
          this.openDialog(title, content, url, primeBtn, secBtn);
        }
      });
    }
  }

  EnterSubmit(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

  onFileSelected(event) {
    if (event.target.files) {
      this.qfile = event.target.files[0];
      this.qurl = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(this.qfile)
      );
    }
  }

  onAnsFileSelected(event) {
    if (event.target.files) {
      this.afile = event.target.files[0];
      this.aurl = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(this.afile)
      );
    }
  }

  prepareFormData(): FormData {
    const formData = new FormData();
    this.ques = new QuestionDto();
    this.ans = new AnswerDto();
    // Populate Answer and Ques class with form data
    this.ques.ques = this.AddQuesForm.get("ques").value;
    this.ques.genre = this.AddQuesForm.get("genre").value;
    this.ques.optionA = this.AddQuesForm.get("optionA").value;
    this.ques.optionB = this.AddQuesForm.get("optionB").value;
    this.ques.optionC = this.AddQuesForm.get("optionC").value;
    this.ques.optionD = this.AddQuesForm.get("optionD").value;

    this.ans.correctOption = this.AddQuesForm.get("correctOption").value;
    this.ans.ansExplaination = this.AddQuesForm.get("ansExplaination").value;

    formData.append('question', new Blob([JSON.stringify(this.ques)], { type: 'application/json' }));
    formData.append('answer', new Blob([JSON.stringify(this.ans)], { type: 'application/json' }));
    if (this.qfile != null) {
      formData.append('quesImageFile', this.qfile, this.qfile.name);
    } else{
      formData.append('quesImageFile', new Blob(), null);
    }
    if (this.afile != null) {
      formData.append('ansImageFile', this.afile, this.afile.name);
    } else{
      formData.append('ansImageFile', new Blob(), null);
    }

    return formData;
  }

  openDialog(title: string, content: string, url: string, primeBtn: string, secBtn: string): void {
    let obj = {};
    obj['title'] = title;
    obj['content'] = content;
    obj['primeBtn'] = primeBtn;
    if (url != null) {
      obj['url'] = url;
    }
    if (secBtn != null) {
      obj['secBtn'] = secBtn;
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
