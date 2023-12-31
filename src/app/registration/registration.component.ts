import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { IconModelComponent } from '../icon-model/icon-model.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  

  RegForm: FormGroup;
  profilePic: string = "assets/images/user.png";
  hide: boolean = true;
  profileImage: File;
  pageload: boolean = false;

  // // Values for Chip Autocomplete 
  // @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // genre = [
  // ];
  // selectedGenre = [
  // ];
  filteredOptions: Observable<string[]>;


  constructor(private formBuilder: FormBuilder,
    private userService: UserService, private datepipe: DatePipe,
    private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.userService.getCodeMapByCat('Genre').subscribe((response) => {
    //   // this.genre = response;
    //   this.filteredOptions = this.RegForm.get('genres').valueChanges.pipe(
    //     startWith(null),
    //     map((gnr: string | null) => gnr ? this._filter(gnr) : this.genre.slice()));
    // });
    this.RegForm = this.formBuilder.group({
      image: [null],
      name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.email],
      dob: [null]
      // genres: [null]
    });
  }

  onSelectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.profileImage = e.target.files[0];
      reader.onload = (event: any) => {
        this.profilePic = event.target.result;
        this.RegForm.patchValue({
          image: reader.result
        });
      }
    }
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.genre.filter(gnr => gnr.toLowerCase().indexOf(value.toLowerCase()) === 0);
  // }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   if (this.genre.indexOf(value.trim()) === -1) {
  //     return;
  //   }

  //   if ((value || '').trim() && this.selectedGenre.indexOf(value.trim()) === -1) {
  //     this.selectedGenre.push(value.trim());
  //   }

  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // remove(genre: any): void {
  //   const index = this.selectedGenre.indexOf(genre);

  //   if (index >= 0) {
  //     this.selectedGenre.splice(index, 1);
  //   }
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   if (this.selectedGenre.indexOf(event.option.value.trim()) === -1) {
  //     this.selectedGenre.push(event.option.value);
  //   }
  //   this.RegForm.get('genres').setValue(null);
  //   this.genreInput.nativeElement.value = '';
  // }

  submit() {
    // this.RegForm.get('genres').setValue(this.selectedGenre);
    if (this.RegForm.valid) {
      this.pageload = true;
      const formValues = this.setUpFormData();
      this.userService.saveUserData(formValues).subscribe(
        (response) => {
          this.pageload = false;
          if (response.status === 200) {
            this.login();
          }
        },
        error => {
          this.pageload = false;
          console.log("Failue");
          let title: string = "Error!";
          let content: string = "Username already Exist. Please select a new Username";
          let url: string = null;
          let primeBtn: string = null;
          let secBtn: string = "Ok";
          this.openDialog(title, content, url, primeBtn, secBtn);
        });
    }
  }
  setUpFormData() {
    let dob: string = this.datepipe.transform(this.RegForm.get('dob').value, 'yyyy-MM-dd');
    let user: User = new User(this.RegForm.get('name').value, this.RegForm.get('username').value,
      this.RegForm.get('password').value, this.RegForm.get('email').value, dob, this.profilePic);
    return user;
  }
  // getValuesAsPipes(list: any): any {
  //   let str: string = '';
  //   for (let value of list) {
  //     if (str.length > 0) {
  //       str += ',';
  //     }
  //     str += value;
  //   }
  //   return str;
  // }

  login() {
    localStorage.setItem('isLoggedIn', "true");
    localStorage.setItem('token', this.RegForm.get('username').value);
    this.router.navigate(['/home']);
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

  EnterSubmit(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

  openIconDialog(){
    const dialogRef = this.dialog.open(IconModelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - '+result);
      if(result!=undefined){
        this.profilePic = result;
      } else{
        this.profilePic = "assets/images/user.png";
      }
    });
  }
}
