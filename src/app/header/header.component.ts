import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  headerTitle:string;

  @Output()
  toggle:EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  toggleNav(){
    this.toggle.emit("drawer.toggle()");
  }

}
