import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RegistrationPageService} from './registration-page.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
  providers: [RegistrationPageService]
})

export class RegistrationPageComponent {
  isLoading = false;
  hasError: string;
  constructor(private registrationService: RegistrationPageService) {}
  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) { return; }
    const clientName = form.value.username;
    const password = form.value.password;
    this.registrationService
      .registration(clientName, password)
      .subscribe(res => { console.log(res); this.isLoading = false; }, error => {
        if (error.status === 409) {
          this.hasError = 'Username is already used';
          this.isLoading = false;
        } else {
          this.hasError = 'Error. Please try again';
          this.isLoading = false; }});
    form.reset();
  }
}
