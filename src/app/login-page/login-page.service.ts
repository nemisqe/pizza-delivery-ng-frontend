import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';

interface LoginResData {
  id: number;
  clientName: string;
  password: any;
}

@Injectable()

export class LoginPageService {
  constructor(private http: HttpClient) {}
  login(clientName: string, password: any) {
    return this.http.post<LoginResData>('http://localhost:3001/authentication/', {
      clientName, password
    });
  }
}
