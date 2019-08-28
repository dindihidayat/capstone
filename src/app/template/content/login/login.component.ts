import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { ServiceService } from 'src/app/api/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  forms : FormGroup;
  constructor(private fb: FormBuilder,private api : ServiceService,private router : Router) {
    this.forms = fb.group({
      "username":[null,[Validators.required,Validators.minLength(5)]],
      "password":[null,[Validators.required]]
    })
   }

  ngOnInit() {
    var is = localStorage.getItem("isLoggedin");
    if (is) {
      this.router.navigate(['/home']);
    }
  }
  submitForm(value){
    this.api.login(value).subscribe((result) => {
      if (result.status) {
        localStorage.setItem("isLoggedin","true");
        localStorage.setItem("data",JSON.stringify(result.data));
        this.router.navigate(['/home']);
      }else{
        alert("Username atau password salah");
      }
    })
  }
}
