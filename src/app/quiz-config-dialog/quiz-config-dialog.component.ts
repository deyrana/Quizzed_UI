import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-config-dialog',
  templateUrl: './quiz-config-dialog.component.html',
  styleUrls: ['./quiz-config-dialog.component.css']
})
export class QuizConfigDialogComponent implements OnInit {

  quizForm : FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<QuizConfigDialogComponent>) { }

  ngOnInit(): void {

    this.quizForm = this.formBuilder.group({
      genre: [null, Validators.required],
      totalQues: [null, Validators.required]
    });

  }

  submit(){
    if(this.quizForm.valid){
      this.dialogRef.close(this.quizForm.value);
    }
  }

  EnterSubmit(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

}
