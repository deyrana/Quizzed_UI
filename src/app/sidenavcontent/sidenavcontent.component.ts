import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavcontent',
  templateUrl: './sidenavcontent.component.html',
  styleUrls: ['./sidenavcontent.component.css']
})
export class SidenavcontentComponent implements OnInit {

  imgUrl: string;
  username: string;
  userid: number;
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.imgUrl = "assets/images/user.png";
    this.username = localStorage.getItem('token');
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUserData(this.username).subscribe((response) => {
      if (response.image != null) {
        this.imgUrl = response.image
      }
      this.userid = response.userId;
    })
  }


  navigateToAccount() {
    this.route.navigate(['user/detail'], { queryParams: { userId: this.userid, username: this.username } });
  }

  navigateToHome() {
    this.route.navigate(['home']);
  }

  // navigateToBlogs() {
  //   this.route.navigate(['user/blogs'])
  // }

  // navigateToFavBlogs() {
  //   this.route.navigate(['user/favBlogs'])
  // }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }


}
