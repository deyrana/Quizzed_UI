import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';

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

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.headerTitle = "Home";
    this.backdrop = true;
    this.navbarMode = "over";
  }

}
