import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataprofile } from '../../const/setting';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router : Router) { }
  data : any = dataprofile;
  ngOnInit() {
    this.detail();
  }
  detail(){
    var detail = JSON.parse(localStorage.getItem("data"));
    this.data = detail;
  }
  logout(){
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("data");
    this.router.navigate(["/login"]);
  }
}
