import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  hide = true;
  validUser: boolean = false;
  profilePic: string = "assets/images/user.png";
  pageload: boolean = false;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submit() {
    if (this.LoginForm.valid) {
      this.pageload = true;
      const formValues = this.setUpFormData();
      this.loginService.validateCred(formValues).subscribe(
        (response) => {
          console.log(response.status);
          console.log(response.body);
          this.validUser = response.body;
          this.pageload = false;
          this.login();
        },
        error => {
          this.pageload = false;
          let title: string = "Message";
          let content: string = "You are not a valid user. Please SignUp to continue";
          let url: string = "/signup";
          let primeBtn: string = "Cancel";
          let secBtn: string = "SignUp";
          this.openDialog(title, content, url, primeBtn, secBtn);
        });
    }
  }
  setUpFormData() {
    let formData = {};
    formData['username'] = this.LoginForm.get('username').value;
    formData['password'] = this.LoginForm.get('password').value;

    return formData;
  }

  login() {
    if (this.validUser) {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', this.LoginForm.get('username').value);
      this.router.navigate(['/home']);
    } else {
      let title: string = "Message";
      let content: string = "Username/Password entered is incorrect";
      let url: string = null;
      let primeBtn: string = "Ok";
      let secBtn: string =null;
      this.openDialog(title, content, url, primeBtn, secBtn);
    }
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

  EnterSubmit(event){
    if(event.keyCode === 13){
      this.submit();
    }
  }

}
