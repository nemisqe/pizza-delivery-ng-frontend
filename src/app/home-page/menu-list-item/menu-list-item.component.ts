import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface IPizzaMenu {
  pizza_name: string;
  cooking_time: number;
  id?: number;
  pizza_picture?: any;
}

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css']
})
export class MenuListItemComponent implements OnInit {

  pizzaMenu: IPizzaMenu[];
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.http.get<IPizzaMenu[]>('http://localhost:3001/menu')
      .subscribe(res => {
        this.pizzaMenu = res;
      });
  }

}


