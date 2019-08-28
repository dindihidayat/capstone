import { Component, OnInit } from '@angular/core';
import {menuItem} from './menuItem';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router : Router) { 
    console.log("Hello World");
  }
  title : string = "Dindi";
  menuItems = menuItem;
  ngOnInit() {
    console.log(this.menuItems);
  }
  navigation(param){
    this.router.navigate(["/"+param]);
  }
}
