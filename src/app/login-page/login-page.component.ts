import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
  }

}
