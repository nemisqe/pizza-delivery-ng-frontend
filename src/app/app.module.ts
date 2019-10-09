import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MenuListComponent } from './home-page/menu-list/menu-list.component';
import { MenuListItemComponent } from './home-page/menu-list-item/menu-list-item.component';
import {HttpClientModule} from '@angular/common/http';
import { CartTableComponent } from './home-page/cart-table/cart-table.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import {StoreModule} from '@ngrx/store';
import {pizzaMenuReducer} from './home-page/menu-list/store/menu-list.reducer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    MenuListComponent,
    MenuListItemComponent,
    CartTableComponent,
    LoginPageComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({pizzaMenu: pizzaMenuReducer}),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
