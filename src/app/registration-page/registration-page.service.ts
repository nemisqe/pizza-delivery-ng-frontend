import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface RegResData {
  id: number;
  clientName: string;
  password: any;
}

@Injectable()

export class RegistrationPageService {
  constructor(private http: HttpClient) { }
  registration(clientName: string, password: any) {
    return this.http.post<RegResData>('http://localhost:3001/clients/add/', {
      clientName, password
    });
  }
}
