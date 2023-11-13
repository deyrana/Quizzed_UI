import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-icon-model',
  templateUrl: './icon-model.component.html',
  styleUrls: ['./icon-model.component.css']
})
export class IconModelComponent implements OnInit {

  icons: any[];

  constructor(public dialogRef: MatDialogRef<IconModelComponent>,
    public userService: UserService) { }

  onNoClick() {
    this.dialogRef.close("Icon Modal");
  }

  closeDailog(img: string){
    this.dialogRef.close(img);
  }

  ngOnInit(): void {
    this.userService.fetchAllIcons().subscribe((response) => {
      this.icons = response;
    });
  }
}
